import inquirer from "inquirer";
import fs, { readFileSync } from 'fs';
import { async } from "rxjs";
import { type } from "os";

const prompts=inquirer.createPromptModule();




/*balans gosteren*/

function showMyBalance () {
    const data = fs.readFileSync('./balans.txt', 'utf-8');

    if (!data.trim()) {
        return 0;
    }

    return data
        .trim()
        .split(',')
        .filter(str => str.trim().length > 0)
        .reduce((a, b) => parseFloat(a) + parseFloat(b));
}

/*pull cekmek*/

function pullchek(amount){
    const dat=fs.readFileSync('numinallar.txt','utf-8');
    const myBalance=showMyBalance();
    if(myBalance>amount){
    fs.appendFileSync('./balans.txt',-amount+",",'utf-8');
    var ayir=dat.split(" ");
    var bazaarr=[];
    var bankarr=[];
    
   
    const numinal=[100,50,20,10,5,1];
    for(let i=0;i<numinal.length;i++){
        let say=Math.floor(amount/numinal[i]);
        var numinalqiymet=ayir[i].split("-")[0];
        var pullsayi=ayir[i].split("-")[1];
        var pullInt=parseInt(pullsayi);

        if(say<=pullInt){
            var numsay2=pullInt-say;
            var str=numinalqiymet+"-"+numsay2;
            bazaarr.push(str);
            bankarr.push(say);

            str="";
            amount=amount%numinal[i];
        }
        else{
            return "pull yoxdur";
        }
    }
    var son_str=bazaarr.join(" ");
    fs.writeFileSync('./numinallar.txt', son_str,'utf-8');
    return bankarr.reverse();
}
else{
    return "balansinizda kifayyet qeder cesait yoxdur";
}

}


/*numinallari artirma*/

function numinall_artirma(numinal,count){

    const data2 =fs.readFileSync('numinallar.txt','utf-8');
    var num=data2.split(" ");
    
        var arr=[];
    for(let i=0;i<num.length;i++){
    let say=num[i].split("-")[1];
    let n=num[i].split("-")[0];
    let sayint=parseInt(say);
    
    if(numinal==n){
    var say2=sayint+count;
    var fsr=numinal+"-"+say2;
    arr.push(fsr);
    }
    
    else{
        let fsr2=n+"-"+say;
        arr.push(fsr2);
    }
    
    
    }
    const str2=arr.join(" ");
    fs.writeFileSync('numinallar.txt',str2,'utf-8');
    return "emeliyyat ugurla yerine yetirildi numinallarin sayi artirildi";
    
    }
    
/*numinallari gosteren*/

function see_numinal(){
    const data=fs.readFileSync('./numinallar.txt','utf-8');
    let numinal=data.split(" ");
    var arr=[];
    var numinallar=[100,50,20,10,5,1];
    for(let i=0;i<numinallar.length;i++){
        let say=numinal[i].split("-")[1];
        let str=numinallar[i]+"manat"+"-"+say+"dene";
        arr.push(str);
        str="";
    }
    return arr;
    
}


/*terminaldaki suallar*/

async function ishe_sal(){
    while(true){
        var netice=await prompts([
            {
                massage:'ne etmek isteyirsiniz',
                type:'list',
                choices:['Balansimi goster','Pul chek','numinallara bax','numinallari artir'],
                name:"secim"

            }
        ]);
        switch(netice.secim){
            case 'Balansimi goster':
            const balance = showMyBalance();
            console.log("Sizin balansiniz:", balance, '$');
            console.log("============================");
            break;
           
            case 'Pul chek':
                const cavab2 = await prompts([
                    {
                        message: 'meblegi daxil edin',
                        type: 'number',
                        name: 'amount'
                    }
                ]);

                console.log(pullchek(cavab2.amount));
                break;
            case 'numinallara bax':
                    const pul=see_numinal();
                    console.log(pul);
                    break;

                    case 'numinallari artir':
                        const cav=await prompts([{
                            massage:'artirmaq istediyiniz numinal novunu secin',
                            type:'list',
                            choices:['100','50','20','10','5','1'],
                            name:'secim2'
                        }]);
                        switch(cav.secim2){
                            case '100':
                                const sual1=await prompts([{
                                    massage:'numinal sayini daxil edin',
                                    type:'number',
                                    name:'say'
                                }])
                                console.log(numinall_artirma(cav.secim2,sual1.say));

                                break;
                                case '50':
                                const sual2=await prompts([{
                                    massage:'numinal sayini daxil edin',
                                    type:'number',
                                    name:'say'
                                }])
                                console.log(numinall_artirma(cav.secim2,sual2.say));

                                break;
                                case '20':
                                const sual3=await prompts([{
                                    massage:'numinal sayini daxil edin',
                                    type:'number',
                                    name:'say'
                                }])
                                console.log(numinall_artirma(cav.secim2,sual3.say));

                                break;
                                case '10':
                                const sual4=await prompts([{
                                    massage:'numinal sayini daxil edin',
                                    type:'number',
                                    name:'say'
                                }])
                                console.log(numinall_artirma(cav.secim2,sual4.say));

                                break;
                                case '5':
                                const sual5=await prompts([{
                                    massage:'numinal sayini daxil edin',
                                    type:'number',
                                    name:'say'
                                }])
                                console.log(numinall_artirma(cav.secim2,sual5.say));

                                break;
                                case '1':
                                const sual6=await prompts([{
                                    massage:'numinal sayini daxil edin',
                                    type:'number',
                                    name:'say'
                                }])
                                console.log(numinall_artirma(cav.secim2,sual6.say));

                                break;
                        }
                       break;
        }
        const ask = await prompts([
            {
                message: 'Davam etmek isteyirsinizmi?',
                type: 'confirm',
                name: 'ask'
            }
        ]);

        if (!ask.ask) {
            console.log("Bye!");
            break;
        }
    }
}
    
console.log(ishe_sal());
