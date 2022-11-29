$(document).ready(function(){

	getBrands();
	
	function getBrands(){
		$.ajax({
			url : './classes/Products.php',
			method : 'POST',
			data : {GET_BRAND:1},
			success : function(response){
				console.log(response);
				var resp = $.parseJSON(response);

				var brandHTML = '';

				$.each(resp.message, function(index, value){
					brandHTML += '<tr>'+
									'<td>'+ value.brand_id +'</td>'+
									'<td>'+ value.brand_title +'</td>'+
									'<td><a class="btn btn-info btn-blue btn-icon edit-brand"><span style="display:none;">'+JSON.stringify(value)+'</span><i class="fas fa-pencil-alt" style="color: #fff;"></i></a></td>'+
									'<td><a bid="'+value.brand_id+'" class="btn btn-danger btn-red btn-icon delete-brand"><i class="fas fa-trash-alt" style="color: #fff;"></i></a></td>'+
								'</tr>';
				});

				$("#brand_list").html(brandHTML);

			}
		})
		
	}

	$(".add-brand").on("click", function(){

		$.ajax({
			url : './classes/Products.php',
			method : 'POST',
			data : $("#add-brand-form").serialize(),
			success : function(response){
				var resp = $.parseJSON(response);
				if (resp.status == 202) {
					getBrands();
					$("#add-brand");
					alert(resp.message);
				}else if(resp.status == 303){
					alert(resp.message);
				}
				
			}
		})

	});

	$(document.body).on('click', '.delete-brand', function(){

		var bid = $(this).attr('bid');

		if (confirm("Are you sure you want to delete this brand?")) {
			$.ajax({
				url : './classes/Products.php',
				method : 'POST',
				data : {DELETE_BRAND:1, bid:bid},
				success : function(response){
					var resp = $.parseJSON(response);
					if (resp.status == 202) {
						alert(resp.message);
						getBrands();
					}else if(resp.status == 303){
						alert(resp.message);
					}
				}
			});
		}else{
			alert('Cancelled');
		}

		

	});

	$(document.body).on("click", ".edit-brand", function(){

		var brand = $.parseJSON($.trim($(this).children("span").html()));
		console.log(brand);
		$("input[name='e_brand_title']").val(brand.brand_title);
		$("input[name='brand_id']").val(brand.brand_id);

		$("#edit_brand_modal").modal('show');

		

	});

	$(".edit-brand-btn").on("click", function(){
		$.ajax({
			url : './classes/Products.php',
			method : 'POST',
			data : $("#edit-brand-form").serialize(),
			success : function(response){
				var resp = $.parseJSON(response);
				if (resp.status == 202) {
					getBrands();
					$("#edit_brand_modal").modal('hide');
					alert(resp.message);
				}else if(resp.status == 303){
					alert(resp.message);
				}
				
			}
		});
	});

});