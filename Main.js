const axios = require('axios');
const head = {'user-agent': 'Mozilla5.0 (Windows NT 10.0; Win64; x64) AppleWebKit537.36 (KHTML, like Gecko) Chrome75.0.3770.142 Safari537.36'}    

const SyosetuCode = "";
const fs = require('fs');

async function Main(chapter){
    var res = await axios.get("https://ncode.syosetu.com/" + SyosetuCode + "/" + chapter.toString(), {headers: head});
    res = res.data;
    var id = res.indexOf('>', res.indexOf('class="novel_subtitle"')) + 1;
    var title = res.slice(id, res.indexOf('</p>', id));
    id = res.indexOf('>', res.indexOf('id="novel_honbun"')) + 1;
    var content = res.slice(id, res.indexOf('</div>', id));
    content = content.replace(/<[^>]*>/g, "");
    const fullcontent = title + "\n" + content;

    fs.writeFile(chapter.toString() + ".txt", fullcontent, () => {
        console.log("Done with chapter " + chapter.toString());
        if (res.indexOf('<a href="/' + SyosetuCode + '/' + (chapter + 1).toString() + '/">') != -1){
            Main(chapter + 1);
        } else {
            console.log("finished"); 
        }
    });
}

Main(1);