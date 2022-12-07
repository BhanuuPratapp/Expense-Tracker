
const period=document.getElementById("period")
const expensecontainer=document.getElementById("reportexpenses")
const token=localStorage.getItem("token");

window.addEventListener('DOMContentLoaded',() =>{
const filecontents = document.getElementById("fileContents");
axios
.get(`http://localhost:1000/purchase/filecontents`,{headers:{"Authorization":token}}).then((response)=>{
console.log(response.data.data)

for(let i=0;i<response.data.data.length;i++)
{
    console.log(response.data.data[i].filecontenturl)
    const filecontentdiv=document.createElement("div")
    filecontentdiv.classList.add('expensediv')
    filecontentdiv.innerHTML=`
    <span class="desc1">Download Time</span>
    <span class="category">${response.data.data[i].createdAt}</span>
    <a href="${response.data.data[i].filecontenturl}" download>
    Click Here to download the ExpenseFile
</a>
    `
    
    filecontents.append(filecontentdiv)
    console.log(filecontents)
}

})

})


period.addEventListener("change",async ()=>{
    
    let obj={
        period:document.getElementById("period").value
    };
    const token=await localStorage.getItem("token");
  
    axios
    .get(`http://localhost:1000/purchase/report`,{headers:{"Authorization":token}}).then((res)=>{
        const user2=res.data.re
        expensecontainer.innerHTML="";

        for(let i=0;i<user2.length;i++)
                {
                  const expensediv=document.createElement("div")
                  expensediv.classList.add('expensediv')
                  expensediv.innerHTML=`
                  <span>.</span>
                  <span class="desc1">${user2[i].description}</span>
                  <span class="category">${user2[i].category}</span>
                  <span class="money">${user2[i].expenseamount}</span>
                  `
        
                  expensecontainer.appendChild(expensediv)
                  
                }
    })



})
const back=document.getElementById('back')
back.addEventListener("click",()=>{
    window.location.replace('./expense.html')

})


const downloadreport=document.getElementById("download")
downloadreport.addEventListener("click",async ()=>{
    console.log("yes i am clicked download report")
    const token=localStorage.getItem("token");
    axios
    .get(`http://localhost:1000/purchase/downloadreport`,{headers:{"Authorization":token}})
    .then((result)=>{
        if(result.status===200){
            var a=document.createElement("a");
            a.href=result.data.fileurl;
            a.download=`myexpenses.csv`;
            a.click();
        }

    })
    .catch(err=>console.log(err))

})