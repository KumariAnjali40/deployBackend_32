const mainSection = document.getElementById("parent");
const descA=document.getElementById('desc');
const submitBtn=document.getElementById('submitBtn');
const titleA=document.getElementById('title');
const create=document.getElementById('create');
const description=document.getElementById('description');
const createBtn=document.getElementById('createBtn');
async function fetchData(){
    try{
    let res = await fetch("https://colorful-pig-cummerbund.cyclic.app/notes/note",{
        headers:{
            "Content-type":"application/json",
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    let data = await res.json();

    console.log(data);

    appendData(data.notes);
    }
    catch(err){
     console.log(err);
    }
}
fetchData();
// const fetchData = ()=>{
//     fetch("",{
//         headers:{
//            "Content-type":"application/json",
//             authorization: Bearer ${localStorage.getItem('token')}
//         }
//     }).then(res=>res.json())
//     .then((data)=>{
//         console.log(data.notes);
//         appendData(data.notes);
//     })
//     .catch(err=>console.log(err))
// }
// fetchData()
function appendData(data){
    mainSection.innerHTML="";
    data.map(item =>{
        mainSection.append(createCard(item));
    })
}
let currentEdit;
function createCard(item){
    const card = document.createElement("div");
    card.classList.add('r-card');

    const title = document.createElement('h1');
    title.classList.add('r-title');
    title.textContent = item.title;
  
    const body = document.createElement('p');
    body.classList.add('para');
    body.textContent = item.body;

    const update= document.createElement("button");
    update.classList.add('update');
    update.innerText="update";

    update.addEventListener("click",(e)=>{
        // e.preventDefault();
        // console.log(item.body);
        // console.log(item.title);
        descA.value=item.body;
        titleA.value=item.title;
        currentEdit=item;
        
    })

    const del=document.createElement('button');
    del.classList.add('delete');
    del.innerText='delete';

    del.addEventListener('click',()=>{
        deleteNote(item._id);
    })

    card.appendChild(title);
    card.appendChild(body);

    card.appendChild(update);
    card.appendChild(del);
    return card;
}

//delete

 async function deleteNote(noteID){
    try{
      let res=await fetch(`https://colorful-pig-cummerbund.cyclic.app/notes/delete/${noteID}`,{
        method:"DELETE",
        headers:{
        "Content-type":"application/json",
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
    })
     if(res.ok){
        fetchData();
     }else{
        console.log("fail to delete the data");
     }
    }
    catch(err){
        console.log(err);
    }
 }



 //update
 submitBtn.addEventListener('click',(e)=>{
    // e.preventDefault();
    console.log("hello")
    updateNote(currentEdit);
})
async function updateNote(item){
    try{
     let res = await fetch(`https://colorful-pig-cummerbund.cyclic.app/notes/update/${item._id}`,{
        method: 'PATCH',
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body:JSON.stringify({
            title : titleA.value,
           body: descA.value
         })
     })
      fetchData()
    }
    catch(err){
      console.log(err);
    }
}



// //post 
// async function postData(){
//     try{
//       let res=await fetch(`https://colorful-pig-cummerbund.cyclic.app/notes/create`,{
//         method:"POST",
//         headers:{
//           "Content-type":"application/json",
//           authorization: `Bearer ${localStorage.getItem('token')}`
//         },
//         body:JSON.stringify({
//             title:create.value,
//             body:description.value,
  
//         })
//       })
//       console.log(res)
//       fetchData();
//     }catch(error){
//       console.error(error);
//     }
//   }
//     createBtn.addEventListener("click", () => {
//         console.log("hello")
//     //   postData();
//     });

export{
    fetchData,
}