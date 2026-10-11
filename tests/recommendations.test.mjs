import test from 'node:test';
import assert from 'node:assert/strict';
import {getAffinity,rankCandidates} from '../src/recommendationEngine.ts';

const entries=[
 {book:{id:'/works/a',author:'Clarice Lispector',tags:['Fiction','Psychological fiction']},rating:5,shelf:'read'},
 {book:{id:'/works/b',author:'Machado de Assis',tags:['Fiction']},rating:4,shelf:'read'},
 {book:{id:'/works/c',author:'Other Author',tags:['Cooking']},rating:0,shelf:'want'}
];
test('favorites contribute more than unreviewed books',()=>{
 const data=getAffinity(entries,'favorites',[]);
 assert.equal(data.topics[0][0],'fiction');
 assert.ok(!data.topics.some(([name])=>name==='cooking'));
});
test('excluded subjects are removed from profile',()=>{
 assert.ok(!getAffinity(entries,'all',['fiction']).topics.some(([name])=>name==='fiction'));
});
test('ranked results avoid owned titles and duplicates, explaining affinity',()=>{
 const affinity=getAffinity(entries,'favorites',[]);
 const candidates=[
 {key:'/works/a',title:'Already saved',subject:['Fiction']},
 {key:'/works/d',title:'New book',subject:['Fiction'],author_name:['Clarice Lispector']},
 {key:'/works/d',title:'Duplicate',subject:['Fiction']},
 {key:'/works/e',title:'No connection',subject:['Biology']}
 ];
 const ranked=rankCandidates(candidates,entries,affinity.topics,affinity.authors,[],false);
 assert.equal(ranked.length,1);
 assert.equal(ranked[0].book.key,'/works/d');
 assert.match(ranked[0].reason,/Clarice Lispector/);
});
test('a completed book can be included when opted in',()=>{
 const affinity=getAffinity(entries,'all',[]);
 const candidates=[{key:'/works/a',title:'Previously read',subject:['Fiction']}];
 assert.equal(rankCandidates(candidates,entries,affinity.topics,affinity.authors,[],false).length,0);
 assert.equal(rankCandidates(candidates,entries,affinity.topics,affinity.authors,[],true).length,1);
});
