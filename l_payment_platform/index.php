
<?php 
	// header('Location: http://www.lacvis.com.ng');
	include "header.php"
?>

<section>
	<div id="loader-wrapper">
		<div id="loader"></div>

		<div class="loader-section section-left"></div>
		<div class="loader-section section-right"></div>

	</div>
	<div class="block whitish">
	<div class="parallax" style="background:url(images/parallax5.jpg);"></div>
		<div class="container"  id="page">
			
		</div>
	</div>
</section>

<?php include "footer.php"; ?>

<script type="text/javascript">
	$(document).ready(function(){
		getpage('lv_search_number_plate.php','page');
	});
	
</script>