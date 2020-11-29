document.addEventListener("DOMContentLoaded", function(){
    getList();
    let form_task = document.getElementById('form_task');
    form_task.addEventListener('submit', sendTask);

    let task_dels = document.querySelectorAll('.task-del');
    task_dels.forEach(element => {
        element.addEventListener('click', task_delete);
    });

});

// Вывод задач
function getList() {
    fetch("php/list.php",
    {
        method: "POST"
    })
    .then(response => {
        if (response.status !== 200) {
            return Promise.reject();
        }
        return response.json();
    })
    .then(function (data) {
         let ar_jsn = data;
         let ul = document.querySelector("#list_tasks");
         ul.innerHTML = '';
        ar_jsn.forEach(element => {
                    let li = `<li>${element.name_task} 
                                  <i title='Удалить' 
                                     class="far fa-trash-alt task-del"
                                     onclick="task_delete(${element.id})"></i>
                              </li>`;
                    ul.innerHTML += li;
                });
            console.log( ar_jsn)
        })
    .catch(() => console.log('ошибка'));     
}



// Добавление задачи
function sendTask(e) {
    let form = document.getElementsByTagName('form')[0];
    let task_name = form.querySelector('input[name="task"]').value;
    let txt_small = document.getElementsByClassName('query-txt')[0];

    if (task_name.length === 0) {
        txt_small.innerHTML = 'Поле обязательно к заполнению';

    } else {
        txt_small.innerHTML = '';
        const request = new XMLHttpRequest();
        const url = "php/sendtask.php";
        const params = "task_name=" + task_name;
        
        request.responseType =	"json";
        request.open("POST", url, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.addEventListener("readystatechange", () => {
            if(request.readyState === 4 && request.status === 200) {
                let ul = document.querySelector("#list_tasks");
                ul.innerHTML = '';
                let arr_json = request.response;
                arr_json.forEach(element => {
                    let li = `<li>${element.name_task} 
                                  <i title='Удалить' 
                                     class="far fa-trash-alt task-del"
                                     onclick="task_delete(${element.id})"></i>
                              </li>`;
                    ul.innerHTML += li;
                });
                console.log(request.response);
            }
        });
        request.send(params);       
    }
    
    e.preventDefault();
}

// Удаление задачи 
function task_delete(id_task) {
    if (!id_task) {
        alert('Некорректный id задачи');
        return false;
    }
    const req = new XMLHttpRequest();
    const url = "php/delete.php";
    const params = "del=" + id_task;
    
    req.responseType =	"json";
    req.open("POST", url, true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.addEventListener("readystatechange", () => {
        if(req.readyState === 4 && req.status === 200) {

            let ul = document.querySelector("#list_tasks");
            ul.innerHTML = '';
            let arr_js = req.response;
            arr_js.forEach(element => {
                let li = `<li>${element.name_task} 
                              <i title='Удалить' 
                                 class="far fa-trash-alt task-del"
                                 onclick="task_delete(${element.id})"></i>
                          </li>`;
                ul.innerHTML += li;
            });
            console.log(arr_js);
        }
    });
    req.send(params);           
   
}