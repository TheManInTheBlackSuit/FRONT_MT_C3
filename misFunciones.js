function traerInformacion(extension, espacio){
$.ajax({
url:"http://150.136.4.8/api/"+extension+"/all",
type:"GET",
datatype:"JSON",
success:function(respuesta){
      pintarRespuesta(respuesta,extension, espacio);
}
});
}


function pintarRespuesta(respuesta,extension, espacio){
  $("#resultado_"+espacio).empty();
  let myTable="<table>";
  if(extension=="Partyroom"){
    myTable+="<tr>";
    let columnas=respuesta[0];
    for(columna in columnas){
      if(columna!="id" && columna!="messages" && columna!="reservations"){
        myTable+="<th>"+columna+"</th>";
      }
    }
    myTable+="</tr>";
    for(i=0;i<respuesta.length;i++){
      myTable+="<tr>";
      for(campo in respuesta[i]){
        if(campo!="id" && campo!="messages" && campo!="reservations"){
          if(campo=="category"){
            myTable+="<td>";
          
            for(atr in respuesta[i][campo]){
              if(atr!="id"){    
                myTable+="<b>"+atr+"</b>"+": "+respuesta[i][campo][atr] +" ";
                myTable+="<br>";
              }
            }
            myTable+="</td>";
          }
          else{
            myTable+="<td>"+respuesta[i][campo]+"</td>";
          }
        }
      }
      myTable+="</tr>";
    }
  }
  else if(extension=="Category"){

    myTable+="<tr>";
    let columnas=respuesta[0];
    for(columna in columnas){
      if(columna!="id"){
        myTable+="<th>"+columna+"</th>";
      }
    }
    myTable+="</tr>";
    for(i=0;i<respuesta.length;i++){
      myTable+="<tr>";
      for(campo in respuesta[i]){
        if(campo!="id"){
          if(campo=="partyrooms"){
            myTable+="<td>";
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
            myTable+="<td>"+respuesta[i][campo]+"</td>";
          }
        }
      }
      myTable+="</tr>";
    }
  }
  else if(extension=="Client"){

    myTable+="<tr>";
    let columnas=respuesta[0];
    for(columna in columnas){
      if(columna!="password"){
        myTable+="<th>"+columna+"</th>";
      }
    }
    myTable+="</tr>";
    for(i=0;i<respuesta.length;i++){
      myTable+="<tr>";
      for(campo in respuesta[i]){
        if(campo!="password"){
          if(campo=="messages" || campo=="reservations"){
            myTable+="<td>";
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
            myTable+="<td>"+respuesta[i][campo]+"</td>";
          }
        }
      }
      myTable+="</tr>";
    }
  }
  else if(extension=="Message"){

    myTable+="<tr>";
    let columnas=respuesta[0];
    for(columna in columnas){
      if(columna!="idMessage"){
        myTable+="<th>"+columna+"</th>";
      }
    }
    myTable+="</tr>";
    for(i=0;i<respuesta.length;i++){
      myTable+="<tr>";
      for(campo in respuesta[i]){
        if(campo!="idMessage"){
          if(campo=="partyroom" || campo=="client"){
            myTable+="<td>";
          
            for(atr in respuesta[i][campo]){

              if(atr!="idClient" && atr!="id" && atr!="password"){    
                myTable+="<b>"+atr+"</b>"+": "+respuesta[i][campo][atr] +" ";
                myTable+="<br>";
              }
            }
            myTable+="</td>";
          }
          else{
            myTable+="<td>"+respuesta[i][campo]+"</td>";
          }
        }
      }
      myTable+="</tr>";
    }
  }
  else if(extension=="Reservation"){

    myTable+="<tr>";
    let columnas=respuesta[0];
    for(columna in columnas){
     
        myTable+="<th>"+columna+"</th>";
      
    }
    myTable+="</tr>";
    for(i=0;i<respuesta.length;i++){
      myTable+="<tr>";
      for(campo in respuesta[i]){
          if(campo=="partyroom" || campo=="client"){
            myTable+="<td>";
          
            for(atr in respuesta[i][campo]){

              if(atr!="id" && atr!="password" && atr!="age"){    
                myTable+="<b>"+atr+"</b>"+": "+respuesta[i][campo][atr] +" ";
                myTable+="<br>";
              }
            }
            myTable+="</td>";
          }
          else{
            myTable+="<td>"+respuesta[i][campo]+"</td>";
          }
        
      }
      myTable+="</tr>";
    }
  }
  myTable+="</table>";
  $("#resultado_"+espacio).append(myTable);
}


function guardarInformacion(extension, espacio, data){
      let dataToSend=JSON.stringify(data);
      $.ajax({
  	url:"http://150.136.4.8/api/"+extension+"/save",
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
  url:"https://g3e4c51ddf11034-reto1ciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/"+extension+"/"+extension,
  type:"PUT",
  data:dataToSend,
  contentType:"application/JSON",
  datatype:"JSON",
  success:function(respuesta){
      traerInformacion(extension, espacio);
      alert("Se ha actualizado.");
  }
});
document.getElementById("actualizar_"+espacio).style.display='none';
}

function borrarElemento(extension,espacio, idElemento){
 let myData={
  id:idElemento
 };
 let dataToSend=JSON.stringify(myData);
 $.ajax({
  url:"https://g3e4c51ddf11034-reto1ciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin"+"/"+extension+"/"+extension,
  type:"DELETE",
  data:dataToSend,
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
  document.getElementById("id_act_"+espacio).disabled='true';
  $.ajax({
   url:"https://g3e4c51ddf11034-reto1ciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin"+"/"+extension+"/"+extension+"/"+id,
   type:"GET",
   datatype:"JSON",
   success:function(respuesta){
      console.log(respuesta);
      let columnas=respuesta.items[0];
     for(columna in columnas){
       document.getElementById(columna+"_act_"+espacio).value=columnas[columna];
     }
   }
  });
}

function limpiarCampos(campos){
  for(campo in campos){
    document.getElementById(String(campo)).value="";
  }

}

