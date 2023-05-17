// const { getAttributes } = require("../../models/Comment");

document.querySelectorAll(".comment-form").forEach(form =>{
    form.addEventListener("submit",e=>{
        e.preventDefault();
        // figure out which post was clicked
        // get the body and user id from that specifc post
        const commentObj = {
            body:document.querySelector("#comment").value,
            post_id:document.querySelector("#post-id").value,
            user_id:document.querySelector("#user-id").value
        }
        console.log(commentObj)
        fetch("/api/comments",{
            method:"POST",
            body:JSON.stringify(commentObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.ok){
               location.reload()
            } else {
                alert("trumpet sound")
            }
        })
    })
})
