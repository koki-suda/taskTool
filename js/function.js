var filters = {
	twelve: function (tasks) {
  	return tasks.filter(function (task) {
    	return task.status === 1
    })
  },
	thirteen: function (tasks) {
  	return tasks.filter(function (task) {
    	return task.status === 2
    })
  },
  fourteen: function (tasks) {
  	return tasks.filter(function (task) {
    	return task.status === 3
    })
  },
  fifteen: function (tasks) {
  	return tasks.filter(function (task) {
    	return task.status === 4
    })
  }
}

Vue.component('task-card', {
	props: ['task'],
  template: `<div class="card">
             <label v-bind:class="{ done: task.isChecked }">
              <input type="checkbox" v-model="task.isChecked"> {{ task.name }}
             </label>
            <footer class="card-footer">
              <div class="card-footer-item">
                {{ task.mandays }} 
              </div>
            </footer>
            <footer class="card-footer">
              <a class="card-footer-item" @click="decrementStatus(task)">◀︎</a>
              <a class="card-footer-item" @click="incrementStatus(task)">▶︎</a>
            </footer>
          </div>`,
  methods: {
    incrementStatus: function (task) {
      if(1 <= task.status && task.status <= 3) {
        task.status++
      }
    },
    decrementStatus: function (task) {
      if(2 <= task.status && task.status <= 4) {
        task.status--
      }
    }
  }
})

new Vue({
	el: '#board',
  data: {
    tasks: [
    	{ name: 'task 1', status: 1, mandays: 3 },
      { name: 'task 2', status: 1, mandays: 2 },
      { name: 'task 3', status: 2, mandays: 1 },
      { name: 'task 4', status: 3, mandays: 1 }
    ],
    newTaskName: '',
    newTaskMandays: 0
  },
  computed: {
    tasks12: function () {
      return filters.twelve(this.tasks)
    },
    tasks13: function () {
      return filters.thirteen(this.tasks)
    },
    tasks14: function () {
      return filters.fourteen(this.tasks)
    },
    tasks15: function () {
      return filters.fifteen(this.tasks)
    }
  },
  methods: {
  	addTask () {
    	this.tasks.push({ 
       name: this.newTaskName, 
       status: 1, 
       mandays: this.newTaskMandays,
       isChecked: false
      });
      this.newItemTitle = '';
      this.saveTodo();
    },
    deleteTodo: function(){
      this.tasks = this.tasks.filter(function (task) {
        return task.isChecked === false;
      });
      this.saveTodo();
    },
    saveTodo: function(){
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    loadTodo: function(){
      this.tasks = JSON.parse( localStorage.getItem('tasks') );
      if( !this.tasks ){
        this.tasks = [];
      }
    },
  },
    mounted: function(){
    this.loadTodo();
  },
})