//front end creating new blog post
document.querySelector("form").addEventListener("submit",e=>{
    e.preventDefault();
    const id = parseInt(document.querySelector('#post-id').value)
    const postObj = {
        title:document.querySelector("#name").value,
        body:document.querySelector("#blog-post").value,
        id
    }
    console.log(postObj)
    fetch(`/api/posts/${id}/edit`,{
        method:"PUT",
        body:JSON.stringify(postObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           window.location.href = '/profile'
        } else {
            alert("error!")
        }
    })
})

//front end delete blog post
const allDelBtns = document.querySelectorAll(".del-btn");
allDelBtns.forEach(button=>{
    button.addEventListener("click",()=>{
        const idToDel = button.getAttribute("data-proj-id");
        fetch(`/api/posts/${idToDel}`,{
            method:"DELETE",
        }).then(res=>{
            if(res.ok){
                location.reload()
            } else {
                alert("error")
            }
        })
    })
})