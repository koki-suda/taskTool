var filters = {
	nine: function (tasks) {
  	return tasks.filter(function (task) {
    	return task.status === 1
    })
  },
	ten: function (tasks) {
  	return tasks.filter(function (task) {
    	return task.status === 2
    })
  },
	eleven: function (tasks) {
  	return tasks.filter(function (task) {
    	return task.status === 3
    })
  },
	twelve: function (tasks) {
  	return tasks.filter(function (task) {
    	return task.status === 4
    })
  },
	thirteen: function (tasks) {
  	return tasks.filter(function (task) {
    	return task.status === 5
    })
  },
  fourteen: function (tasks) {
  	return tasks.filter(function (task) {
    	return task.status === 6
    })
  },
  fifteen: function (tasks) {
  	return tasks.filter(function (task) {
    	return task.status === 7
    })
  },
  sixteen: function (tasks) {
  	return tasks.filter(function (task) {
    	return task.status === 8
    })
  },
  seventeen: function (tasks) {
  	return tasks.filter(function (task) {
    	return task.status === 9
    })
  },
  eighteen: function (tasks) {
  	return tasks.filter(function (task) {
    	return task.status === 10
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
      if(1 <= task.status && task.status <= 9) {
        task.status++
      }
    },
    decrementStatus: function (task) {
      if(2 <= task.status && task.status <= 10) {
        task.status--
      }
    }
  }
})

new Vue({
	el: '#board',
  data: {
    tasks: [],
    newTaskName: '',
    newTaskMandays: 0
  },
  computed: {
    tasks9: function () {
      return filters.nine(this.tasks)
    },
    tasks10: function () {
      return filters.ten(this.tasks)
    },
    tasks11: function () {
      return filters.eleven(this.tasks)
    },
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
    },
    tasks16: function () {
      return filters.sixteen(this.tasks)
    },
    tasks17: function () {
      return filters.seventeen(this.tasks)
    },
    tasks18: function () {
      return filters.eighteen(this.tasks)
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