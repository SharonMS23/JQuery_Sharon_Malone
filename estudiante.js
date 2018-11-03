
	$(document).ready(function(){

		var clave = "";
		var valor = "";

		$("#registrarEstudiante").click(function(){

			var sCodigo = $("#codigo").val();
			var sNombre = $("#nombre").val();
			var sNota = $("#nota").val();

			var estudiante = { 
				codigo : sCodigo,
				nombre : sNombre,
				nota : sNota
			};

			localStorage.setItem(sCodigo,JSON.stringify(estudiante));

			listadoEstudiantes();
			limpiarListadoEstudiantes();

		});

		$("#mostrarPromedio").click(function(){

			var sumaNota = 0;
			var cantNota = 0;

			for (var i = 0; i < localStorage.length; i++){

				clave = localStorage.key(i);
				valor = $.parseJSON(localStorage.getItem(clave));
				sumaNota+= parseInt(valor.nota);
				cantNota++;

			}

			alert("La Nota Promedio de todos los Estudiantes es: " + sumaNota/cantNota);

		});

		$("#mostrarNotaMayor").click(function(){

			var notaMayor=$.parseJSON(localStorage.getItem(localStorage.key(0))).nota;

			for (var i = 1; i < localStorage.length; i++) {
				
				clave = localStorage.key(i);
				valor = $.parseJSON(localStorage.getItem(clave));
				notaMayor = Math.max(notaMayor,parseInt(valor.nota));

			}

			alert("La Nota Mayor de todos los Estudiantes es: " + notaMayor);

		});

		$("#mostrarNotaMenor").click(function(){

			var notaMenor=$.parseJSON(localStorage.getItem(localStorage.key(0))).nota;

			for (var i = 1; i < localStorage.length; i++) {
				
				clave = localStorage.key(i);
				valor = $.parseJSON(localStorage.getItem(clave));
				notaMenor = Math.min(notaMenor,valor.nota);

			}

			alert("La Nota Menor de todos los Estudiantes es: " + notaMenor);

		});

	});

	function listadoEstudiantes (){

		var mostrarEstudiante ="";

		for (var i = 0; i < localStorage.length; i++) {
			
			clave = localStorage.key(i);
			valor = $.parseJSON(localStorage.getItem(clave));
			mostrarEstudiante+="<tr>"+
									"<td>" + valor.codigo + "</td>"+
									"<td>" + valor.nombre + "</td>"+
									"<td>" + valor.nota + "</td>"+
									"<td style='text-align: center'><button onclick='editarEstudiante("+ valor.codigo +");'>Editar</button></td>"+
									"<td style='text-align: center'><button onclick='eliminarEstudiante("+ valor.codigo +");'>Eliminar</button></td>"+
							   "</tr>";
		}

		$("#tbodyestudiantes").html(mostrarEstudiante);

	}

	function limpiarListadoEstudiantes(){

		$("#codigo").val("");
		$("#nombre").val("");
		$("#nota").val("");

	}

	function editarEstudiante(valorCodigo){

		for (var i = 0; i < localStorage.length; i++) {
			
			var codigoBuscar = $.parseJSON(localStorage.getItem(localStorage.key(i))).codigo;
			
			if(codigoBuscar == valorCodigo){
			
				$("#codigo").val(valorCodigo);
				$("#nombre").val($.parseJSON(localStorage.getItem(localStorage.key(i))).nombre);
				$("#nota").val($.parseJSON(localStorage.getItem(localStorage.key(i))).nota);
			
			}
		}
	}

	function eliminarEstudiante(valorCodigo){

		localStorage.removeItem(valorCodigo);
		listadoEstudiantes();

	}

