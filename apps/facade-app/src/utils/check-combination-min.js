import { CARD_RANKS, SYMBOLS, COMBINATIONS } from "consts";

const suits = SYMBOLS.slice().reverse()
const values = CARD_RANKS;
const types = COMBINATIONS
const combs = [[0,1,2,3,4],[0,1,2,3,5],[0,1,2,3,6],[0,1,2,4,5],[0,1,2,4,6],[0,1,2,5,6],
               [0,1,3,4,5],[0,1,3,4,6],[0,1,3,5,6],[0,1,4,5,6],[0,2,3,4,5],[0,2,3,4,6],
               [0,2,3,5,6],[0,2,4,5,6],[0,3,4,5,6],[1,2,3,4,5],[1,2,3,4,6],[1,2,3,5,6],
               [1,2,4,5,6],[1,3,4,5,6],[2,3,4,5,6]];
const arrayCompare=(a,b,i=0)=>i>=a.length?0:a[i]>b[i]?1:a[i]<b[i]?-1:arrayCompare(a,b,i+1);

function getScore(hand) {
  const h = hand.map(c=>({s:suits.indexOf(c.slice(-1)), v:values.indexOf(c.slice(0,-1))})).sort((a,b)=>a.v-b.v||a.s-b.s);
  const isF = h.every(c=>c.s===h[0].s), isS = h.every((c,i)=>c.v===h[0].v+i);
  const groups = h.reduce((g,c)=>(g[c.v]=g[c.v]+1||1,g),{}), kv = Object.keys(groups).map(k=>[groups[k],+k]).sort((a,b)=>b[0]-a[0]||b[1]-a[1]);
  const hg = [...new Set(h.map(c=>c.v))].sort((a,b)=>kv.find(e=>b===e[1])[0]-kv.find(e=>a===e[1])[0]||b-a);
  return isF&&isS ? [8,hg]
  : kv[0][0]===4 ? [7,hg]
       : kv[0][0]===3&&kv[1][0]===2 ? [6,hg]
       : isF ? [5,hg]
       : isS ? [4,hg]
       : kv[0][0]===3 ? [3,hg]
       : kv[0][0]===2&&kv[1][0]===2 ? [2,hg]
       : kv[0][0]===2 ? [1,hg]
       : [0,hg];
}
export function checkCombination(cardsArray) {
  let max = [0,[-1,-1,-1,-1,-1]]
  for(const c of combs) {
    var score = getScore(c.map(i=>cardsArray[i]));
    if(score[0]>max[0]||(score[0]===max[0]&&arrayCompare(score[1],max[1])>0)) max=score;
      }
      return {type:types[max[0]],ranks:max[1].map(n=>values[n])};
      }