import {useEffect,useMemo,useState} from 'react';
import type {ReadingEntry} from './LiteraryLab';
import {getAffinity,rankCandidates} from './recommendationEngine';

type Candidate={key:string;title:string;author_name?:string[];cover_i?:number;first_publish_year?:number;subject?:string[]};
type Preferences={includeRead:boolean;focus:'favorites'|'finished'|'all';exclude:string[]};
const KEY='entrelinhas:dna-preferences:v2';
function load():Preferences{try{const data=JSON.parse(localStorage.getItem(KEY)||'null');if(data&&Array.isArray(data.exclude)&&['favorites','finished','all'].includes(data.focus))return {includeRead:!!data.includeRead,focus:data.focus,exclude:data.exclude.filter((x:unknown)=>typeof x==='string').slice(0,40)}}catch{}return {includeRead:false,focus:'favorites',exclude:[]}}
export default function DNARecommendations({library,onDiscover}:{library:Record<string,ReadingEntry>;onDiscover:(query:string)=>void}){
const [prefs,setPrefs]=useState<Preferences>(load);
const [results,setResults]=useState<Candidate[]>([]);
const [loading,setLoading]=useState(false);
const [error,setError]=useState('');
const [refresh,setRefresh]=useState(0);
const entries=Object.values(library);
const ranked=useMemo(()=>rankCandidates(results,entries,affinity,authors,prefs.exclude,prefs.includeRead),[results,library,prefs,affinity,authors]);
useEffect(()=>{try{localStorage.setItem(KEY,JSON.stringify(prefs))}catch{}},[prefs]);
const {topics:affinity,authors}=useMemo(()=>getAffinity(entries,prefs.focus,prefs.exclude),[library,prefs]);
const query=[...affinity.slice(0,2).map(([name])=>'subject:'+name),...authors.slice(0,1).map(([name])=>'author:'+name)].join(' OR ');
useEffect(()=>{if(!query){setResults([]);return}const controller=new AbortController();setLoading(true);setError('');const params=new URLSearchParams({q:query,limit:'30',fields:'key,title,author_name,cover_i,first_publish_year,subject'});fetch('https://openlibrary.org/search.json?'+params,{signal:controller.signal}).then(async r=>{if(!r.ok)throw Error('Serviço indisponível');return r.json()}).then((data:{docs?:Candidate[]})=>{if(controller.signal.aborted)return;setResults((data.docs||[]).filter(b=>b.key&&b.title))}).catch(()=>{if(!controller.signal.aborted)setError('Não foi possível carregar recomendações. Tente novamente.')}).finally(()=>{if(!controller.signal.aborted)setLoading(false)});return()=>controller.abort()},[query,refresh,prefs.includeRead,library]);
return <section className="dna-recommendations"><h4>Indicações para você</h4><p>Recomendações experimentais baseadas nos assuntos dos livros que você escolheu. Sem IA e sem envio das suas avaliações.</p><div className="dna-controls"><label>Personalizar por<select value={prefs.focus} onChange={e=>setPrefs(p=>({...p,focus:e.target.value as Preferences['focus']}))}><option value="favorites">Livros favoritos (4–5 estrelas)</option><option value="finished">Leituras concluídas</option><option value="all">Toda a minha estante</option></select></label><label><input type="checkbox" checked={prefs.includeRead} onChange={e=>setPrefs(p=>({...p,includeRead:e.target.checked}))}/> Incluir livros já lidos</label><button className="secondary" onClick={()=>setRefresh(x=>x+1)}>Atualizar sugestões</button></div>
{affinity.length>0&&<div className="dna-preferences"><span>Assuntos considerados:</span>{affinity.map(([tag])=><button key={tag} title="Excluir este assunto das recomendações" onClick={()=>setPrefs(p=>({...p,exclude:[...p.exclude,tag]}))}>{tag} ×</button>)}</div>}
{prefs.exclude.length>0&&<div className="dna-preferences"><span>Assuntos ignorados:</span>{prefs.exclude.map(tag=><button key={tag} onClick={()=>setPrefs(p=>({...p,exclude:p.exclude.filter(x=>x!==tag)}))}>{tag} ↺</button>)}<button onClick={()=>setPrefs(p=>({...p,exclude:[]}))}>Limpar exclusões</button></div>}
{!query?<p className="lab-empty">Ainda não há dados suficientes para indicar títulos. Avalie seus livros, conclua leituras ou altere o critério para toda a estante.</p>:loading?<p role="status">Buscando títulos relacionados...</p>:error?<p role="alert">{error}</p>:ranked.length===0?<p className="lab-empty">Nenhuma indicação nova encontrada. Experimente outro critério ou remova exclusões.</p>:<div className="dna-recs-grid">{ranked.map(({book:b,reason})=>{return <article key={b.key} className="dna-rec"><div className="dna-rec-cover">{b.cover_i?<img src={`https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg`} alt={`Capa de ${b.title}`} loading="lazy"/>:<span>Sem capa disponível</span>}</div><div><strong>{b.title}</strong><small>{b.author_name?.[0]||'Autor não informado'}</small><p>{reason}</p><button onClick={()=>onDiscover('title:'+b.title)}>Explorar obra →</button></div></article>})}</div>}
</section>
}
