'use_strict';

$(document).ready(function(){

    var sw;

    $.validator.addMethod("valueNotEquals", function(value, element, arg){
        return arg !== value;
    }, "Value must not equal arg.");

    // Registro en la base de datos

    $('#formCliente').validate({
        rules:{
            primernombreCliente:{
                required:true
            },
            segundonombreCliente:{
                required: true
            },
            apellidosCliente:{
                required:true
            },
            telefonoCliente:{
                required: true,
                number:true
            },
            documentoCliente:{
                required:true,
                number:true
            },
            direccionCliente:{
                required:true
            },
            emailCliente:{
                required:true,
                email:true
            },
            tipoCliente:{
                valueNotEquals:'...',
                required: true
            }
        },
        messages:{
            primernombreCliente:'Digite el nombre del cliente',
            segundonombreCliente:'Digite el nombre del cliente',
            apellidosCliente:'Digite los apellidos del cliente',
            telefonoCliente:'Digite el telefono de contacto',
            documentoCliente:'Digite el documento del cliente',
            direccionCliente:'Digite la direccion del cliente',
            emailCliente:'Digite el email del cliente',
            tipoCliente:'Seleccione un tipo de Cliente'
        },
        submitHandler: function(form){
            var formulario = $('#formCliente');
            console.log(formulario.serialize());

            $.ajax({
                url: "../controlador/clienteController.php",
                method:'post',
                data:formulario.serialize(),
                success:function(data){
                    if(data=="true"){
                        successModal("Registro exitoso!","Se registro Correctamente el cliente");
                        limpiarCliente();
                    }
                    else{
                        console.log(data);
                    }
                }
            })
        }
    })

    function limpiarCliente() {
        $('#primernombreCliente').val('')
        $('#segundonombreCliente').val('')
        $('#apellidosCliente').val('')
        $('#telefonoCliente').val('')
        $('#documentoCliente').val('')
        $('#direccionCliente').val('')
        $('#emailCliente').val('')
        $('#tipoCliente').val('')
    }


    $('#formProducto').validate({
        rules:{
            nombreproducto : {
                required:true

            },
            codigoproducto : {
                required:true , number:true
            },
            colorIDproducto: {
                required:true,
                valueNotEquals:'...'
            },
            telaIDproducto:{
                required:true,
                valueNotEquals: '...'
            },
            proveedorIDProducto:{
                required: true,
                valueNotEquals: '...'
            },
            productoID:{
                required: true,
                valueNotEquals:'...'
            },
            categoriaIDproducto:{
                required:true,
                valueNotEquals: '...'
            },
            observacionProducto:{
                required: true
            },
            tallaproducto:{
                required:true
            },
            cantidadProductoM:{
                required: true
            },
            precioProductoM:{
                required: true
            },
            tallaProductoM:{
                required: true
            }
        },
        messages: {
            nombreproducto: 'Ingrese nombre del producto',
            codigoproducto: 'Ingrese codigo de referencia del producto',
            colorIDproducto:  'Seleccione un Color',
            telaIDproducto : 'Seleccione un tipo de tela',
            proveedorIDProducto: 'Seleccione un proveedor',
            productoID: 'Seleccione un tipo de producto',
            categoriaIDproducto: 'Seleccione una categoria',
            tallaproducto: 'Digite una talla para registrar',
            cantidadProductoM: 'Digite la cantidad del producto',
            precioProductoM: 'Digite el precio del producto',
            tallaProductoM: 'Digite la talla del producto'
        },
        submitHandler : function(form){

            var formulario = $('#formProducto');
            console.log('llegamos a registrar');

            $.ajax({
                url: "../controlador/productoController.php",
                method:'post',
                data:formulario.serialize(),
             success : function(data)
                 {
                    console.log(data);
                    if(data=="true"){
                        successModal('Registro Exitoso','El producto se Registro correctamente!');
                        limpiarProducto();
                    }
                    else{
                        errorModal('Error','Se presento un Error al momento de registrar')
                    }
                 }
            });
        }
	});

		function limpiarProducto() {
				$('#nombreproducto').val('')
				$('#codigoproducto').val('')
				$('#colorIDproducto').val('')
				$('#telaIDproducto').val('')
				$('#proveedorIDProducto').val('')
				$('#productoID').val('')
				$('#categoriaIDproducto').val('')
				$('#tallaproducto').val('')
				$('#cantidadProductoM').val('')
				$('#precioProductoM').val('')
				$('#tallaProductoM').val('')
		}


    $('#formCategoria').validate({
        rules:{
            nombrecategoriaM: {
                required : true
            },
            descripcioncategoriaM:{
                required:true
            }
        },
        messages:{
            nombrecategoriaM: 'Digite un nombre de categoria',
            descripcioncategoriaM : 'Digite la descripcion de la categoria'
        },
        submitHandler :function(form){
						var formulario = $('#formCategoria');


            $.ajax({
                url: "../controlador/categoriaController.php",
                method:'post',
                data:formulario.serialize(),
             success : function(data)
                 {
                    if(data=="true"){
                        console.log('bein hecho');
                        successCategoria();
                    }
                    else
                    {
                        if(data=='ya esta registrada'){
                            $('#ajax').addClass('alert alert-warning');
                            $('#ajax').html('La categoria ya se encuentra registrada');
                            setTimeout(function() {
                                $("#ajax").fadeOut(1500);
                                },3000);
                        }else{
                        $('#ajax').html('No se pudo registrar correctamente la categoria0');
                        }
                    }
                 }
            });
        }
    });

    function successCategoria() {
        $('#ajax').addClass('alert alert-info');
        $('#ajax').html('Se registro correctamente la categoria');

        setTimeout(function() {
        $("#ajax").fadeOut(1500);
        },3000);

        $("#nombrecategoriaM").val('');
        $("#descripcioncategoriaM").val('');

        setTimeout(function() {
        $("#agregar_categoria").fadeOut(1500);
        $('#agregar_categoria').modal('hide');
        },3000);
    }


    $('#formTipoArticulo').validate({
        rules:{
            nombrearticuloM:{
                required:true
            },
            descripcionarticuloM:{
                required:true
            }
        },
        messages:{
            nombrearticuloM:' Digite el nombre del articulo',
            descripcionarticuloM: 'Digite la descripcion del articulo'
        },
        submitHandler: function(form){
            var formulario = $('#formTipoArticulo');

            $.ajax({
                url: "../controlador/articuloController.php",
                method:'post',
                data:formulario.serialize(),
             success : function(data)
                 {
                    if(data=="true"){
												console.log('bein hecho');
												$('#ajax_articulo').addClass('alert alert-info');
                        $('#ajax_articulo').html('Se registro correctamente el articulo');

                        setTimeout(function() {
                        $("#ajax_articulo").fadeOut(1500);
                        },3000);

                        $("#nombrearticuloM").val('');
                        $("#descripcionarticuloM").val('');

                        setTimeout(function() {
                        $("#agregar_articulo").fadeOut(1500);
                        $('#agregar_articulo').modal('hide');
                        },3000);
                    }
                    else
                    {
												if(data=="ya se encuentra registrado el articulo"){
													$('#ajax_articulo').addClass('alert alert-warning');
												  $('#ajax_articulo').html('El nombre del articulo ya se encuentra registrado');

													setTimeout(function() {
													$("#ajax_articulo").fadeOut(1500);
													},3000);
												}
												else{
													$('#ajax_articulo').html('No se pudo registrar correctamente el articulo');
												}
                    }
                 }
            });
        }
    })

    $('#formTipoMaterial').validate({

        rules:{
            nombrematerialM:{
            required:true
             },
            descripcionmaterialM:{
            required:true
			 			}
					},
            messages:{
							nombrematerialM: 'Digite el nombre del material',
							descripcionmaterialM: 'Digite el nombre de la descripcion'
            },
            submitHandler: function(form){

            var formulario = $('#formTipoMaterial');

            $.ajax({
            url: "../controlador/materialController.php",
            method:'post',
            data:formulario.serialize(),
            success : function(data)
                {
                if(data=="true"){
                    console.log('bein hecho');
                    successMaterial();
                }
                    else
                    {
                        if(data=="El elemento ya se encuentra registrado"){
                            $('#ajax_material').addClass('alert alert-warning');
                            $('#ajax_material').html('El nombre del material ya se encuentra registrado');

                                setTimeout(function() {
                                $("#ajax_material").fadeOut(1500);
                                },3000);
                        }
                        else{
                            $('#ajax_material').html('No se pudo registrar correctamente el material');
                        }
					}
                }
                });
            }


    })

    $('#formProveedor').validate({
        rules:{
            nombreEmpresaProveedor:{
                required:true
            },
            nitProveedor:{
                required:true
            },
            telefonoproveedor:{
                required:true,
                number:true
            },
            emailempresa:{
                required:true,
                email: true
            },
            direccionEmpresa:{
                required:true
            }
        },
        messages:{
            nombreEmpresaProveedor:'Digite nombre de la empresa',
            nitProveedor:'Digite un NIT correspondiente',
            telefonoproveedor:'Digite el telefono del proveedor',
            emailempresa:'Digite el email de la empresa',
            telefonocontacto:'Digite el telefono de contacto (Personal)',
            direccionEmpresa:'Digite la direccion de la empresa'
            },

            submitHandler: function(form){

            var formulario = $('#formProveedor');
            $.ajax({
                url: "../controlador/proveedorController.php",
                method:'post',
                data:formulario.serialize(),
                success : function(data){
                    if(data=="true"){
                        successModal('Registro Exitoso!','Se registro Correctamente el proveedor <br> Debes Asignar un contacto para el proveedor')
                        limpiarProveedor()
                    }
                    else{
                        errorProveedor(data);
                    }
                }
            })
            }
    })


    $('#formEmpleado').validate({
        rules:{
            primernombreEmpleado:{
                required:true
            },
            segundonombreEmpleado:{
                required:true
            },
            apellidosEmpleado:{
                required:true
            },
            TipoDocumentoEmpleado:{
                required:true,
                valueNotEquals:'...'
            },
            documentoEmpleado:{
                required:true,
                number:true
            },
            nacionalidadEmpleado:{
                required:true,
                valueNotEquals:'...'
            },
            nacimientoEmpleado:{
                required:true
            },
            direccionEmpleado:{
                required:true
            },
            lugarnacimientoEmpleado:{
                required:true
            },
            expedocEmpleado:{
                required:true
            },
            emailempleado:{
                required:true,
                email:true
            },
            rolEmpleado:{
                required:true,
                valueNotEquals:'..'
            }
        },
        messages:{
            primernombreEmpleado:'Digite el nombre del empleado',
            segundonombreEmpleado:'Digite el segundo nombre',
            apellidosEmpleado:'Digite el apellido del empleado',
            TipoDocumentoEmpleado:'Seleccione el tipo de documento',
            documentoEmpleado:'Digite el documento del empleado (Solo numeros)',
            nacionalidadEmpleado:'Seleccione la nacionalidad del empleado',
            nacimientoEmpleado:'Seleccione la fecha de nacimiento',
            lugarnacimientoEmpleado:'Digite el lugar de nacimiento',
            expedocEmpleado:'Digite la fecha de expedicion del documento',
            emailempleado:'Digite el correo del Empleado',
            rolEmpleado:'Seleccione el rol del empleado'
        },
        submitHandler: function(form){
            var formulario = $('#formEmpleado')

            $.ajax({
                url: "../controlador/empleadoController.php",
                method:'post',
                data:formulario.serialize(),
                success : function(data){
                    debugger
                    if(data=="true"){
                        successModal('Registro Exitoso!','Se registro correctamente el empleado!')
                        limpiarEmpleado()
                        console.log(data);
                    }
                    else{
                        // errorModal('Error','El registro no pudo ser completado')
                        // console.log(data);
                        if(data=="emailregistrado"){
                            errorModal('Registro errado','El email del empleado ya esta registrado');
                            $('#emailempleado').val('')
                        }
                        else if(data=="no se pudo registrar el usuario"){
                            errorModal('Registro Errado','No se pudo registrar correctamente <br> Rectifica tus datos')
                        }

                    }
                }
            })
        }
    })

		/**
		 * Funciones Personalizadas
		 */

        function limpiarEmpleado(){
            $('#primernombreEmpleado').val('')
            $('#segundonombreEmpleado').val('')
            $('#apellidosEmpleado').val('')
            $('#TipoDocumentoEmpleado').val('')
            $('#documentoEmpleado').val('')
            $('#nacionalidadEmpleado').val('')
            $('#nacimientoEmpleado').val('')
            $('#lugarnacimientoEmpleado').val('')
            $('#expedocEmpleado').val('')
            $('#emailempleado').val('')
        }

		 function errorProveedor(data) {
			 console.log(data);
		}

        function successMaterial() {
            $('#ajax_material').addClass('alert alert-info');

            $('#ajax_material').html('Se registro correctamente el material');

            setTimeout(function() {
            $("#ajax_material").fadeOut(1500);
            },3000);

            $("#nombrematerialM").val('');
            $("#descripcionmaterialM").val('');

            setTimeout(function() {
            $("#agregar_material").fadeOut(1500);
            $('#agregar_material').modal('hide');
            },3000);
        }

        function limpiarProveedor() {
                $('#nombreEmpresaProveedor').val('')
                $('#nitProveedor').val('')
                $('#telefonoproveedor').val('')
                $('#direccionEmpresa').val('')
                $('#emailempresa').val('')
        }

		function successModal(titulo,cuerpo) {
				$('#modalSuccessTitulo').html(titulo);
				$('#modalSuccessBody').html(cuerpo);
				$('#modalSuccess').modal('show');
				setTimeout(function() {
				$('#modalSuccess').modal('hide');
				},3900);
		}

		function errorModal(titulo,cuerpo) {
			$('#modalErrorTitulo').html(titulo);
			$('#modalErrorBody').html(cuerpo);
			$('#modalError').modal('show');
			setTimeout(function() {
			$('#modalError').modal('hide');
			},3900);
        }


        $('#editarCliente').on('show.bs.modal', function (e) {
            var button = $(e.relatedTarget);
            var id = button.data('id');
            var pnombres=button.data('pnombre')
            var apellidos=button.data('apellidos')
            var documento=button.data('documento')
            var direccion=button.data('direccion')
            var telefono=button.data('telefono')
            var email=button.data('email')

            var modal = $('#editarCliente');

            modal.find('#idCliente').val(id);
            modal.find('#primerNombreClienteED').val(pnombres);
            modal.find('#apellidosClienteED').val(apellidos);
            modal.find('#documentoClienteED').val(documento);
            modal.find('#telefonoClienteED').val(telefono);
            modal.find('#emailClienteED').val(email);

        })


        $('#editarEmpleado').on('show.bs.modal',function(e){

            var button = $(e.relatedTarget)
            var id = button.data('id')
            var pnombres=button.data('nombres')
            var apellidos=button.data('apellidos')
            var documento=button.data('documento')
            var direccion=button.data('direccion')
            var nacionalida=button.data('nacionalidad')
            var email=button.data('email')
            var fecha=button.data('fecha')


            var modal = $('#editarEmpleado');

            modal.find('#idEmpleado').val(id);
            modal.find('#primerNombreEmpleadoED').val(pnombres);
            modal.find('#apellidosEmpleadoED').val(apellidos);
            modal.find('#documentoEmpleaadoED').val(documento);
            modal.find('#nacionalidadEmpleadoED').val(nacionalida);
            modal.find('#correoEmpleadoED').val(email);
            modal.find('#direccionEmpleadoED').val(direccion);
            modal.find('#fechaRegistoEmpleadoED').val(fecha);

        })


				// Falta Terminar eliminar cliente - Modo cascada
        $('#eliminarCliente').on('show.bs.modal', function(event){
            var button = $(event.relatedTarget)
            var id = button.data('id')
            console.log(id);

            var modal = $('#eliminarCliente')
            modal.find('#idClienteElimina').val(id);
        })


        // Ediciones de la base de datos


        $('#formEditarCliente').validate({
            rules:{
                primerNombreClienteED:{
                    required:true
                },
                apellidosClienteED:{
                    required:true
                },
                documentoClienteED:{
                    required:true,
                    number:true
                },
                telefonoClienteED:{
                    required:true,
                    number:true
                },
                emailClienteED:{
                    required:true,
                    email:true
                }
            },
            messages:{
                primerNombreClienteED:'Digite el nombre del cliente',
                apellidosClienteED:'Digite los apellidos del cliente',
                documentoClienteED:'Digite el documento del cliente',
                telefonoClienteED:'Digite el telefono del cliente',
                emailClienteED:'Digite el email del cliente'
            },submitHandler: function(form){
                var data;
                var id = document.getElementById("idCliente").value;
                var primerNombreClienteED = document.getElementById("primerNombreClienteED").value;
                var apellidosClienteED = document.getElementById("apellidosClienteED").value;
                var documentoClienteED = document.getElementById("documentoClienteED").value;
                var telefonoClienteED = document.getElementById("telefonoClienteED").value;
                var emailClienteED = document.getElementById("emailClienteED").value;
                var editar = 1;

                $.ajax({
                    url: "../archivos/AjaxController.php",
                    method:'POST',
                    data:{id:id , primerNombreClienteED: primerNombreClienteED , apellidosClienteED:apellidosClienteED,
                    documentoClienteED:documentoClienteED, telefonoClienteED:telefonoClienteED , emailClienteED:emailClienteED,
                    editar:editar},
                    success : function(data){
                        if(data=="true"){
                            successAjaxDiv('#ajax_editarCliente','Se actualizaron los datos del cliente','#editarCliente','alert alert-info',data)
                        }
                        else{
                            if(data=="emailregistradocliente"){
                                successAjaxDiv('#ajax_editarClienteError','El Email del cliente ya se encuentra registrado','#editarCliente','alert alert-danger','false')
                            }
                            else{
                                successAjaxDiv('#ajax_editarClienteError','Error al conectar con la base de datos','#editarCliente','alert alert-danger','false')
                            }
                        }

                    }
                })
            }
		})

				// Falta terminar Eliminar cliente
        $('#formEliminarCliente').submit(function(event){
            event.preventDefault();

            var id = document.getElementById("idClienteElimina").value;
            var editar = 2;
            $.ajax({
                url: "../archivos/AjaxController.php",
                method: 'POST',
                data: {editar:editar , id:id},
                success : function(form){

                }
            })
        })

        function successAjaxDiv(div,contenido,modal,clase,data) {
        	$(div).addClass(clase);
        	$(div).html(contenido);
          if(data=="true"){

                setTimeout(function() {
                $(div).fadeOut(1500);
                },3000);

                setTimeout(function() {
                $(modal).fadeOut(1500);
                $(modal).modal('hide');
                },3000);
            }
            else{
                setTimeout(function() {
                $(div).fadeOut(1500);
                },3000);

            }

        	$(div).css('display','block');
        }

      $('#formEstudiosEmpleado').validate({
        rules:{
          Instituto:{
            required:true
          },
          Titulo:{
            required:true
          },
          aniosalida:{
            required:true
          }
        },
        messages:{
          Instituto:'Digite el nombre del Instituto',
          Titulo:'Digite el nombre del titulo obtenido',
          aniosalida:'Seleccione la fecha de terminacion'
        },
        submitHandler: function(form){

          var id = document.getElementById("idEmpleadoeEstudios").value;
          var Instituto = document.getElementById("Instituto").value;
          var titulo = document.getElementById("Titulo").value;
          var salid = document.getElementById("aniosalida").value;
          var editar = 3;
          console.log(salid);

          $.ajax({
              url: "../archivos/AjaxController.php",
              method: 'POST',
              data: {id:id,editar:editar,Instituto:Instituto,titulo:titulo,salid:salid},
              success : function(data){
                if(data=="true"){
                    successAjaxDiv('#ajax_editarEmpleadoEstudios','Se registro correctamente los estudios','#agregar_estudios','alert alert-info',data)
                    $('#Instituto').val('')
                    $('#Titulo').val('')
                    $('#aniosalida').val('')     
                }
                else{
                    successAjaxDiv('#ajax_editarEmpleadoEstudios','No se realizo el registro con Exito','#agregar_estudios','alert alert-warning','false')
                }  
              }
          })
        }
      })

      


})