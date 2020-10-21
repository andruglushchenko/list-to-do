

        let ul = document.querySelector('#ul');
        // предотвращаем ненужное выделение элементов списка при клике
        ul.onmousedown = function () {
            return false;
        };
        ul.addEventListener('click', function (e) {
            // предотвращаем выделение всего ul при клике
            if (e.target.tagName != "LI")
                return;
            //   присваиваем class selected для li с зажатым ctrl
            if (e.ctrlKey) {
                addSelect(e.target);
            } else {
                //   присваиваем для li class selected поклику и убираем у остальных
                singleSelect(e.target);
            }

        })

        function addSelect(elems) {
            elems.classList.add('selected');
        }

        function singleSelect(elems) {
            let selected = ul.querySelectorAll('.selected');
            for (let elem of selected) {
                elem.classList.remove('selected');
            }
            elems.classList.add('selected');
        }
        // ======================================================
        let taskArr = ['тяпнуть коньячка', 'поработать', 'пообщаться с друзьями', 'отремонтировать машину'];

        // выбираем случайный элемент массива
        function getRandomElem(taskArr) {
            rand = Math.floor(Math.random() * taskArr.length);
            return taskArr[rand]
        }
        // =======================================================
        class Menu {
            constructor(elem) {
                this._elem = elem;
                elem.onclick = this.onClick.bind(this); // (*)
            }
            // добавляем задачу в начало
            addTaskBefore() {
                let addTaskBefore = document.querySelector('#addTaskBefore');
                let li = document.createElement('li');
                li.innerHTML = getRandomElem(taskArr);
                ul.prepend(li)
            }
            // добавляем задачу в конец
            addTaskAfter() {
                let addTaskAfter = document.querySelector('#addTaskAfter');
                let li = document.createElement('li');
                li.innerHTML = getRandomElem(taskArr);
                ul.append(li)
            }
            // удаляем выбранные елементы с классом selected
            deleteElements() {
                let deleteElements = document.querySelector('#deleteElements')
                let allSelectedLi = document.querySelectorAll('.selected');
                for (let elem of allSelectedLi) {
                    elem.remove()
                }
            }
            // сортируем выделенные li
            // sortElements() {
            //     let sortElements = document.querySelector('#sortElements')
            //     ul.children.sort((a, b) => a.classList.contains(".selected") > b.classList.contains(".selected") ? 1 : -1)
            // }
            onClick(event) {
                let action = event.target.dataset.action;
                if (action) {
                    this[action]();
                }
            };
        }

        new Menu(menu);
