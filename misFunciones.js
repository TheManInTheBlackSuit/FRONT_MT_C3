function traerInformacion(extension, espacio){
$.ajax({
url:"http://localhost:8080/api/"+extension+"/all",
type:"GET",
datatype:"JSON",
success:function(respuesta){
      pintarRespuesta(respuesta,extension, espacio);
}
});
}


function mostrarEspacio(espacio){
  document.getElementById("gestion_categorias").style.display='none';
  document.getElementById("gestion_salones").style.display='none';
  document.getElementById("gestion_clientes").style.display='none';
  document.getElementById("gestion_mensajes").style.display='none';
  document.getElementById("gestion_reservas").style.display='none';
  document.getElementById("gestion_"+espacio).style.display='block';

}

function pintarRespuesta(respuesta,extension, espacio){
  $("#resultado_"+espacio).empty();
  let myTable="<table class='TablaResultados'>";
  var id=-1;
  if(extension=="Partyroom"){
    myTable+="<tr>";
    let columnas=respuesta[0];
    for(columna in columnas){
      if(columna!="id" && columna!="messages" && columna!="reservations"){
        myTable+="<th class='DatoResultados'>"+columna+"</th>";
      }
    }
    myTable+="</tr>";
    for(i=0;i<respuesta.length;i++){
      myTable+="<tr>";
      for(campo in respuesta[i]){
        if(campo=="id"){
          id=respuesta[i][campo];
        }
        if(campo!="id" && campo!="messages" && campo!="reservations"){
          if(campo=="category"){
            myTable+="<td class='DatoResultados'>";
          
            for(atr in respuesta[i][campo]){
              if(atr!="id"){    
                myTable+="<b>"+atr+"</b>"+": "+respuesta[i][campo][atr] +" ";
                myTable+="<br>";
              }
            }
            myTable+="</td>";
          }
          else{
            myTable+="<td class='DatoResultados'>"+respuesta[i][campo]+"</td>";
          }
        }
      }
      myTable+="<td><button onclick='habilitarEdicion("+'"'+extension+'"'+","+'"'+espacio+'"'+","+id+")'>Editar</button></td>";
      myTable+="<td><button onclick='borrarElemento("+'"'+extension+'"'+","+'"'+espacio+'"'+","+id+")'>Borrar</button></td>";
      myTable+="</tr>";
    }
  }
  else if(extension=="Category"){

    myTable+="<tr>";
    let columnas=respuesta[0];
    for(columna in columnas){
      if(columna!="id"){
        myTable+="<th class='DatoResultados'>"+columna+"</th>";
      }
    }
    myTable+="</tr>";
    for(i=0;i<respuesta.length;i++){
      myTable+="<tr>";
      for(campo in respuesta[i]){
        if(campo=="id"){
          id=respuesta[i][campo];
        }
        if(campo!="id"){
          if(campo=="partyrooms"){
            myTable+="<td class='DatoResultados'>";
            for(subcampo in respuesta[i][campo]){
              myTable+="[";
              for(atr in respuesta[i][campo][subcampo]){
                if(atr!="id"){    
                  myTable+="<b>"+atr+"</b>"+": "+respuesta[i][campo][subcampo][atr] +" ";
                  myTable+="<br>";
                }
              }
              myTable+="]<br>";
            }
            myTable+="</td>";
          }
          else{
            myTable+="<td class='DatoResultados'>"+respuesta[i][campo]+"</td>";
          }
        }
      }
      myTable+="<td><button onclick='habilitarEdicion("+'"'+extension+'"'+","+'"'+espacio+'"'+","+id+")'>Editar</button></td>";
      myTable+="<td><button onclick='borrarElemento("+'"'+extension+'"'+","+'"'+espacio+'"'+","+id+")'>Borrar</button></td>";
      myTable+="</tr>";
    }
  }
  else if(extension=="Client"){

    myTable+="<tr>";
    let columnas=respuesta[0];
    for(columna in columnas){
      if(columna!="password" && columna!="idClient" && columna!="messages" && columna!="reservations"){
        myTable+="<th class='DatoResultados'>"+columna+"</th>";
      }
    }
    myTable+="</tr>";
    for(i=0;i<respuesta.length;i++){
      myTable+="<tr>";
      for(campo in respuesta[i]){
        if(campo=="idClient"){
          id=respuesta[i][campo];
        }
        else{
          if(campo!="password" && campo!="messages" && campo!="reservations"){
            if(campo=="messages" || campo=="reservations"){
              myTable+="<td class='DatoResultados'>";
              for(subcampo in respuesta[i][campo]){
                myTable+="[";
                for(atr in respuesta[i][campo][subcampo]){
                  if(atr!="id"){    
                    myTable+="<b>"+atr+"</b>"+": "+respuesta[i][campo][subcampo][atr] +" ";
                    myTable+="<br>";
                  }
                }
                myTable+="]<br>";
              }
              myTable+="</td>";
            }
            else{
              myTable+="<td class='DatoResultados'>"+respuesta[i][campo]+"</td>";
            }
          }
        }
      }
      myTable+="<td><button onclick='habilitarEdicion("+'"'+extension+'"'+","+'"'+espacio+'"'+","+id+")'>Editar</button></td>";
      myTable+="<td><button onclick='borrarElemento("+'"'+extension+'"'+","+'"'+espacio+'"'+","+id+")'>Borrar</button></td>";
      myTable+="</tr>";
    }
  }
  else if(extension=="Message"){

    myTable+="<tr>";
    let columnas=respuesta[0];
    for(columna in columnas){
      if(columna!="idMessage"){
        myTable+="<th class='DatoResultados'>"+columna+"</th>";
      }
    }
    myTable+="</tr>";
    for(i=0;i<respuesta.length;i++){
      myTable+="<tr>";
      for(campo in respuesta[i]){
        if(campo=="idMessage"){
          id=respuesta[i][campo];
        }
        if(campo!="idMessage"){
          if(campo=="partyroom" || campo=="client"){
            myTable+="<td class='DatoResultados'>";
          
            for(atr in respuesta[i][campo]){

              if(atr!="idClient" && atr!="id" && atr!="password"){ 
                if(atr=="category"){
                  myTable+="<b>"+atr+"</b>"+": "+respuesta[i][campo][atr]["name"] +" ";
                }
                else{   
                myTable+="<b>"+atr+"</b>"+": "+respuesta[i][campo][atr] +" ";
                }
                myTable+="<br>";
              }
            }
            myTable+="</td>";
          }
          else{
            myTable+="<td class='DatoResultados'>"+respuesta[i][campo]+"</td>";
          }
        }
      }
      myTable+="<td><button onclick='habilitarEdicion("+'"'+extension+'"'+","+'"'+espacio+'"'+","+id+")'>Editar</button></td>";
      myTable+="<td><button onclick='borrarElemento("+'"'+extension+'"'+","+'"'+espacio+'"'+","+id+")'>Borrar</button></td>";
      myTable+="</tr>";
    }
  }
  else if(extension=="Reservation"){
    myTable+="<tr>";
    let columnas=respuesta[0];
    for(columna in columnas){
        myTable+="<th class='DatoResultados'>"+columna+"</th>";
    }
    myTable+="</tr>";
    for(i=0;i<respuesta.length;i++){
      myTable+="<tr>";
      for(campo in respuesta[i]){
        if(campo=="idReservation"){
          id=respuesta[i][campo];
        }

        if(campo=="partyroom" || campo=="client"){
          myTable+="<td class='DatoResultados'>";
        
          for(atr in respuesta[i][campo]){
            if(atr!="password" && atr!="age" && atr!="id" && atr!="messages"){    
              if(atr=="category"){
                myTable+="<b>"+atr+"</b>"+": "+respuesta[i][campo][atr]["name"] +" ";
              }
              else{
                myTable+="<b>"+atr+"</b>"+": "+respuesta[i][campo][atr] +" ";
              }
              myTable+="<br>";
            }
          }
          myTable+="</td>";
        }
        else{
          myTable+="<td class='DatoResultados'>"+respuesta[i][campo]+"</td>";
        }
        
      }
      myTable+="<td><button onclick='habilitarEdicion("+'"'+extension+'"'+","+'"'+espacio+'"'+","+id+")'>Editar</button></td>";
      myTable+="<td><button onclick='borrarElemento("+'"'+extension+'"'+","+'"'+espacio+'"'+","+id+")'>Borrar</button></td>";
      myTable+="</tr>";
    }
  }
  myTable+="</table>";
  $("#resultado_"+espacio).append(myTable);
}


function guardarInformacion(extension, espacio, data){
      let dataToSend=JSON.stringify(data);
      $.ajax({
  	url:"http://localhost:8080/api/"+extension+"/save",
  	type:"POST",
  	data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
  	success:function(respuesta2){
      	  traerInformacion(extension, espacio);
          cargarCategorias();
          cargarPartyrooms();
          cargarClientes();
          cargarPartyrooms2();
          cargarClientes2();
        }
      });
  

}


function actualizarInformacion(extension, espacio, data){
  let dataToSend=JSON.stringify(data);
  $.ajax({
    url:"http://localhost:8080/api/"+extension+"/update",
    type:"PUT",
    data:dataToSend,
    contentType:"application/JSON",
    datatype:"JSON",
    success:function(respuesta){
        traerInformacion(extension, espacio);
        alert("Se ha actualizado.");
        cargarCategorias();
        cargarPartyrooms();
        cargarClientes();
        cargarPartyrooms2();
        cargarClientes2();
    }
  });
  document.getElementById("actualizar_"+espacio).style.display='none';
}

function borrarElemento(extension,espacio, idElemento){
  $.ajax({
    url:"http://localhost:8080/api/"+extension+"/"+idElemento,
    type:"DELETE",
    contentType:"application/JSON",
    datatype:"JSON",
    success:function(respuesta){
        traerInformacion(extension, espacio);
        alert("Se ha eliminado.");
    } 
  });
}

function habilitarEdicion(extension,espacio, id){
  document.getElementById("actualizar_"+espacio).style.display='block';
  $.ajax({
   url:"http://localhost:8080/api/"+extension+"/"+id,
   type:"GET",
   datatype:"JSON",
   success:function(respuesta){
     for(columna in respuesta){
      if(extension=="Partyroom"){
        if(columna!="category" && columna!="messages" && columna!="reservations"){
          document.getElementById(columna+"_act_"+espacio).value=respuesta[columna];
        }
      }
      if(extension=="Category"){
        if(columna!="partyrooms"){
          document.getElementById(columna+"_act_"+espacio).value=respuesta[columna];
        }
      }
      if(extension=="Client"){
        document.getElementById("password"+"_act_"+espacio).value="";
        if(columna!="email" && columna!="password" && columna!="messages" && columna!="reservations"){
          document.getElementById(columna+"_act_"+espacio).value=respuesta[columna];
        }
      }
      if(extension=="Message"){
        if(columna!="partyroom" && columna!="client"){
          document.getElementById(columna+"_act_"+espacio).value=respuesta[columna];
        }
      }
      if(extension=="Reservation"){
        if(columna!="status" && columna!="partyroom" && columna!="client" && columna!="score" 
        && columna!="startDate" && columna!="devolutionDate"){
          document.getElementById(columna+"_act_"+espacio).value=respuesta[columna];
        }
      }

     }
   }
  });
}

function limpiarCampos(campos){
  for(campo in campos){
    document.getElementById(String(campo)).value="";
  }

}

