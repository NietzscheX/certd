
import fs from 'fs'
function check(){
    const gitAdd =  fs.readFileSync("./node_modules/@lerna-lite/version/dist/lib/git-add.js","utf-8")
    if(gitAdd.indexOf("('git', ['add', '.']") > -1){
        console.log("git-add 已经修改过了")
    }else{
        console.error("git-add 没有修改过")
        throw new Error("git-add 还没修改过")
    }

    //GH_TOKEN
    if(!process.env.GH_TOKEN){
        console.error("GH_TOKEN 未设置")
        throw new Error("GH_TOKEN 未设置")
    }
}

check()
