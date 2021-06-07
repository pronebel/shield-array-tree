export  default  class FlattenTree {


    constructor(treeArray,childKey){
        this.__originArray = treeArray
        this.__flattenArray = []
        this.__childKey = childKey
        this.__init();

    }

    __init(){
        let arr = this.__originArray;
        arr.forEach((item) => {
            let curF = this.flattenExec(item,this.__childKey,0,[],1)
            this.__flattenArray.push(curF)
        });
    }

    flattenExec (root, key, index=0, parentIndexes=[], deep=1) {

        root.indexes = parentIndexes.slice()
        root.indexes.push({
            index:index,
            deep:deep
        })


        let flatten = [Object.assign({}, root)];
        delete flatten[0][key];

        let subChild= root[key];

        let subChildLen = subChild && subChild.length > 0? subChild.length : 0
        if (subChildLen > 0) {

            return flatten.concat(
                subChild
                    .map((child,idx)=>this.flattenExec(child, key,idx,root.indexes,subChildLen))
                    .reduce((a, b)=>a.concat(b), [])
            );
        }

        return flatten;
    }
    ___searchFullItems(targetBranch,indexes){
        // let step=0
        // let arr=[]

        // for(let i=0;i<indexes.length;i++){
        //     let curIdx = indexes[i]

        //     let len=curIdx.deep;
        //     let index = curIdx.index
        //     let curStep = step+index //当前元素索引
        //     arr.push(targetBranch[curStep])
        //     step+=len;//下个元素的起步
        // }
        // return arr;

        

    
    }
    /**
     * 根据索引在原数组进行搜索
     * @param {} targetBranch 
     * @param {*} indexes 
     */
    __getFullItemsByIndexes(targetBranch,indexes){
        let nextChild =  [Object.assign({}, targetBranch)];

       
        let fullPath = []
        for(let i=0;i<indexes.length;i++){
            let {index,deep}= indexes[i]
            
            let curItem = nextChild[index]
            let __item = Object.assign({},curItem)
            delete __item[this.__childKey]
            nextChild = curItem[this.__childKey]
            fullPath.push(__item)        
        }
        return fullPath;
    }

    find(key,val){ 
        let flatItem = null
        let targetBranch = null
        let targetOriginBranch = null
        for(let i=0; i<this.__flattenArray.length; i++){
            let curBranch = this.__flattenArray[i];
            let __item = curBranch.find(item=>{
                return item[key]===val
            })
            if(__item){
                targetBranch = curBranch
                targetOriginBranch = this.__originArray[i]               
                flatItem=__item;
                break;
            }
        }
        if(flatItem){
            let fullPath = flatItem.indexes;
            let fullItems = this.__getFullItemsByIndexes(targetOriginBranch,fullPath.slice())
            return fullItems
        }else{
            return []
        }
    }
}
