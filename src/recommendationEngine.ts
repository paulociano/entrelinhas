export type Candidate={key:string;title:string;author_name?:string[];cover_i?:number;first_publish_year?:number;subject?:string[]};
export type LibrarySignal={book:{id:string;author:string;tags?:string[]};rating:number;shelf:'want'|'reading'|'read'};
export type Focus='favorites'|'finished'|'all';
const normalize=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();
export function getAffinity(entries:LibrarySignal[],focus:Focus,excluded:string[]){
 const counts=new Map<string,number>();const authors=new Map<string,number>();const blocked=new Set(excluded.map(normalize));
 for(const entry of entries){const weight=focus==='favorites'?(entry.rating>=4?entry.rating:0):focus==='finished'?(entry.shelf==='read'?3:0):(entry.rating>=4?4:entry.shelf==='read'?3:1);if(!weight)continue;
 const author=normalize(entry.book.author);if(author&&author!=='autor não informado')authors.set(author,(authors.get(author)||0)+weight);
 for(const tag of entry.book.tags?.slice(0,12)||[]){const name=normalize(tag);if(name.length<3||name.length>35||blocked.has(name))continue;counts.set(name,(counts.get(name)||0)+weight)}
 }
 return {topics:[...counts].sort((a,b)=>b[1]-a[1]).slice(0,6),authors:[...authors].sort((a,b)=>b[1]-a[1]).slice(0,5)};
}
export function rankCandidates(candidates:Candidate[],entries:LibrarySignal[],topics:[string,number][],authors:[string,number][],excluded:string[],includeRead:boolean){
 const owned=new Set(entries.filter(e=>!includeRead||e.shelf!=='read').map(e=>e.book.id));const ignored=new Set(excluded.map(normalize));
 const topicWeights=new Map(topics);const authorWeights=new Map(authors);
 const seen=new Set<string>();
 return candidates.filter(c=>{if(!c.key||!c.title||owned.has(c.key)||seen.has(c.key))return false;seen.add(c.key);return !c.subject?.some(t=>ignored.has(normalize(t)))})
 .map(book=>{const matchedTopics=[...new Set((book.subject||[]).map(normalize))].filter(t=>topicWeights.has(t));const matchedAuthors=[...new Set((book.author_name||[]).map(normalize))].filter(a=>authorWeights.has(a));const points=matchedTopics.reduce((sum,t)=>sum+(topicWeights.get(t)||0),0)+matchedAuthors.reduce((sum,a)=>sum+(authorWeights.get(a)||0)*1.8,0);return {book,points,reason:matchedAuthors.length?'Você já leu obras de '+(book.author_name?.find(a=>normalize(a)===matchedAuthors[0])||'este autor')+'.':matchedTopics.length?'Combina com seu interesse em '+matchedTopics[0]+'.':'Relacionada aos assuntos escolhidos.'}})
 .filter(r=>r.points>0).sort((a,b)=>b.points-a.points||(b.book.cover_i?1:0)-(a.book.cover_i?1:0)).slice(0,8);
}
