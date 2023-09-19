 
 const signOut = document.getElementById('signOut');
 
 
 
 async function handleCredentialResponse (res) {
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.
   //console.log('id_token', response.credential)
   const body = {
    id_token : res.credential}

   try {
    const response = await fetch('http://localhost:8081/api/auth/google',{
        method:'post',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify(body)
       })
       let result = await response.json();
       console.log("deseando ver el resultado",result.usuario.email)
       localStorage.setItem('email',result.usuario.email)
       
       if (response.ok) {
        console.log('genial, todo bien ingrersando con el token de google signin')
       }else{
        console.log('error en la solicitud')
       }
   } catch (error) {
    console.log('error ocurrido', error)
    
   }
 
 }


 signOut.addEventListener('click',()=>{
    console.log(google.accounts.id)
    google.accounts.id.disableAutoSelect()


    google.accounts.id.revoke(localStorage.getItem('email'),done => {
        localStorage.clear();
        location.reload()
    } )

 })