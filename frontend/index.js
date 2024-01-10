const mynotes=document.createElement('mynotes');

async function fetchData(){
    try{
       let res=await fetch('https://colorful-pig-cummerbund.cyclic.app/notes/note',{
         headers:{
            "Content-Type":"application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`

         }

       })
       let data=await res.json();
       console.log(data);
       

    }
    catch(err){
        console.log(err);
    }
}

fetchData();