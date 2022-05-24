class Todo{
  
    constructor(id, creationDate, name, tags, priority){
      this.id = id;
      this._creationDate = creationDate.getTime();
      this.name = name;
      this.tags = tags;
      this.priority = priority
    }



    set creationDate(value){
      this._creationDate = value.getTime()
    }

    get creationDate (){
      return new Date(this._creationDate)
    }
    

    static fromObj(obj){
      return new Todo(obj.id, new Date(obj.createDate*1000), obj.name, obj.tags, obj.priority)
    }

    static getFormatteDate(date){
      let minutes = date.getMinutes();
      minutes = minutes <= 9 ? '0' + minutes : minutes;
      const dateString = date.getDate()+ '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() + ' ' + date.getHours() + ':' + minutes);
      return dateString
    }


  
  }