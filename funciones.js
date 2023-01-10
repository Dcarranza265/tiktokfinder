const inputUsuario = document.getElementById("inputUsuario")
const btnBuscar = document.getElementById("btnBuscar")
const imgUsuario = document.getElementById("imgUsuario")
const nickname = document.getElementById("nickname")
const username = document.getElementById("username")
const userId = document.getElementById("userId")
const estadoCuenta = document.getElementById("estadoCuenta")
const totalVideos = document.getElementById("totalVideos")
const seguidores = document.getElementById("seguidores")
const siguiendo = document.getElementById("siguiendo")
const corazones = document.getElementById("corazones")
const verificado = document.querySelector(".bi-check-circle-fill")
const videos = document.querySelectorAll(".video")
const fechaVideo = document.querySelectorAll(".fechaVideo")
const duracion = document.querySelectorAll(".duracion")
const reproducciones = document.querySelectorAll(".reproducciones")


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a3aa94d648msh8d1925923eb6c1bp1e6aacjsn5ecc5c53cff6',
		'X-RapidAPI-Host': 'tiktok82.p.rapidapi.com'
	}
};


document.addEventListener('DOMContentLoaded', () =>{    
    fetchdata("memoriasdelfutbol_of")    
})

btnBuscar.addEventListener ('click', () =>{
    const usuario = inputUsuario.value
    fetchdata(usuario)
})

const fetchdata = async (user) => {
    try{
        const res = await fetch(`https://tiktok82.p.rapidapi.com/getProfile?username=${user}`, options)
        if (!res.ok) {
            alert("Usuario no encontrado")
            inputUsuario.value =""
            const message = `An error has occured: ${res.status}`;
            throw new Error(message);
        }
        const datos = await res.json()                    

        const infoUsuario = {
            nickname : datos.data.user.nickname,
            username : datos.data.user.uniqueId,
            id : datos.data.user.id,
            estadoCuenta : datos.data.user.privateAccount,
            videos : datos.data.stats.videoCount,
            seguidores : datos.data.stats.followerCount,
            siguiendo: datos.data.stats.followingCount, 
            corazones :datos.data.stats.heart,
            foto_sm : datos.data.user.avatarThumb,
            foto_medium : datos.data.user.avatarMedium,
            foto_large : datos.data.user.avatarLarger,
            verificado : datos.data.user.verified,
            secUid : datos.data.user.secUid
        }
        mostrarInfo(infoUsuario)
        fetchdata2(infoUsuario.id,infoUsuario.secUid)        

    } catch (error){
        console.log(error);
    }    
}

const mostrarInfo = (user) =>{
    nickname.textContent = user.nickname;
    username.textContent = "@" + user.username;
    userId.textContent = "ID: " + user.id;
    estadoCuenta.textContent = user.estadoCuenta;
    totalVideos.textContent = user.videos;
    seguidores.textContent = user.seguidores;
    siguiendo.textContent = user.siguiendo;
    corazones.textContent = user.corazones; 

    imgUsuario.setAttribute("src", user.foto_sm)   
    username.setAttribute("href", "https://www.tiktok.com/@" + user.username)    
    
    if (user.verificado == true) {        
        verificado.removeAttribute("hidden")        
    }

    if (user.estadoCuenta == true) {
        estadoCuenta.textContent = "Cuenta privada"        
    }else estadoCuenta.textContent = "Cuenta pública" 
}

const fetchdata2 = async (id, secUid) =>{
    try{
        const res2 = await fetch(`https://tiktok82.p.rapidapi.com/getUserVideos?user_id=${id}&secUid=${secUid}`, options)
        if (!res2.ok) {
            alert("Videos no encontrados")            
            const message2 = `An error has occured: ${res2.status}`;
            throw new Error(message2);
        }
        const datos2 = await res2.json()        
        mostrarDatosVideos(datos2)        
    
    }catch (error) {
        console.log(error);
    }
}

const fetchdata3 = async (idVideo, pos) =>{
    try{
        const res3 = await fetch(`https://tiktok82.p.rapidapi.com/getVideoInfo?video_id=${idVideo}`, options)
        if (!res3.ok) {
            alert("Videos no encontrados")            
            const message3 = `An error has occured: ${res3.status}`;
            throw new Error(message3);
        }
        const datos3 = await res3.json()            
        mostrarVideo(datos3,pos)
    
    }catch (error) {
        console.log(error);
    }

    
}

const mostrarDatosVideos = (datosVideos) =>{         
    for (let index = 0; index < 4; index++) {        
        const idVideo = datosVideos.data.items[index].id
        fetchdata3(idVideo, index)        
        console.log(idVideo)        
        const date = new Date((datosVideos.data.items[index].createTime)*1000);
        const dia = date.getDate()
        const mes = date.getMonth()+1
        const año = date.getFullYear()
        fechaVideo[index].textContent =  dia + "/" + mes + "/" + año 
        duracion[index].textContent = datosVideos.data.items[index].video.duration + " seg." 
        reproducciones[index].textContent = datosVideos.data.items[index].stats.playCount            
    }
}
    
const mostrarVideo = (videoUrl, pos) => {
    videos[pos].setAttribute("src", videoUrl.data.video.playAddr)
}

