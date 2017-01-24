function add_to_cart(product_id,product_price){
	$.get("/cartadd?product_id="+product_id);
}