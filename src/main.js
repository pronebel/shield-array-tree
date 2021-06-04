import ms from 'ms';
import lunchtime from './lunchtime.js';
import millisecondsUntil from './millisecondsUntil.js';

export default function howLongUntilLunch(hours, minutes) {
	// lunch is at 12.30
	if (hours === undefined) hours = 12;
	if (minutes === undefined) minutes = 30;

	var millisecondsUntilLunchTime = millisecondsUntil(lunchtime(hours, minutes));
	return ms(millisecondsUntilLunchTime, { long: true });
}


'use strict';

const stepLarget = 10000


var  tree = [{
    name: 'root-1',
    children: [{
      name: 'root-1-1'
    }, {
      name: 'root-1-2',
      children:[{
        name: 'root-1-2-1'
      }]
    }]
  },
  {
    name: 'book-1',
    children: [ {
      name: 'book-1-1',
      children:[{
        name: 'book-1-1-1'
      }]
    }]
  }]

function flattenTree(root, key,index=0,parentIndexes=[],parentDeeps=[]) {
	let deep = root[key] && root[key].length > 0? root[key].length : 0
	root.indexes = parentIndexes.slice()
	root.indexes.push(index)
	root.deeps= parentDeeps.slice()
	if(deep>0){
		
		root.deeps.push(deep)
	}
  let flatten = [Object.assign({}, root)];
  delete flatten[0][key];
 
  

  if (root[key] && root[key].length > 0) {
	 
    return flatten.concat(
		root[key]
			.map((child)=>flattenTree(child, key,index++,root.indexes,root.deeps))
      		.reduce((a, b)=>a.concat(b), [])
    );
  }

  return flatten;
};


let 