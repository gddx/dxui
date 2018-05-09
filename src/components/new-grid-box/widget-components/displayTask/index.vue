<template>
	<div class="task-show">
		<ul>
			<li></li>
		</ul>
	</div>
</template>
<script>
export default {
	props: {
		taskItem: {
			type: Array,
			default: []
		}
	}
}
</script>
<style scoped>
.task-show {
	padding: 20px;
}
</style>
