class Todo {

    static PRIORITY = {
      low: { order: 0, name: 'bassa', color: 'green' },
      medium: { order: 1, name: 'media', color: 'yellow' },
      high: { order: 2, name: 'alta', color: 'orange' },
      veryHigh: { order: 3, name: 'molto alta', color: 'red' }
    }
  
    constructor(name, tags = [], creationDate = new Date(), priority = Todo.PRIORITY.low) {
      this.name = name;
      this.tags = tags;
      this._creationDate = creationDate.getTime();
      this.priority = priority;
    }
  
    get creationDate() {
      return new Date(this._creationDate);
    }
  
    set creationDate(date) {
      this._creationDate = date.getTime();
    }
  
    set priorityOrder(order) {
      if (order === 0) {
        this.priority = Todo.PRIORITY.low;
      } else if (order === 1) {
        this.priority = Todo.PRIORITY.medium;
      } else if (order === 2) {
        this.priority = Todo.PRIORITY.high;
      } else if (order === 3) {
        this.priority = Todo.PRIORITY.veryHigh;
      }
    }
  
    static fromDbObj(obj) {
      const todo = new Todo(obj.name, obj.tags, new Date(obj.creationDate * 1000));
      todo.id = obj.id;
      todo.priorityOrder = obj.priority;
      return todo;
    }

    toDbObj(){
        const obj = {
            name : this.name,
            tags : this.tags,
            priority : this.priority.order,
            creationDate : this.creationDate/1000
        };
        return obj;
    }
  
    static orderTodoByPriority(t1, t2) {
      return t2.priority.order - t1.priority.order;
    }
  }


//sort in classe

// function sortTodoPriority(t1, t2){
//     return t2.priority.order - t1.priority.order;
// } cambio sul ArrayTodo per il sortTodoPriority