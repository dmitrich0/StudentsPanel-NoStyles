(() => {
    let students = [];
    function processStudent(student) {
        const now = new Date();
        const age = now.getFullYear() - student.birthInput.getFullYear();
        const course = Number(now.getFullYear()) - Number(student.yearInput) + 1;
        return {
            name: student.nameInput + " " + student.surnameInput + " " + student.patronymicInput,
            faculty: student.facultyInput,
            birthDate: `${student.birthInput.getDate()}.${student.birthInput.getMonth() + 1}.${student.birthInput.getFullYear()} (${age} лет)`,
            learningYear: course <= 4 ? `${student.yearInput}-${Number(student.yearInput) + 4} (${course} курс)` : `${student.yearInput}-${Number(student.yearInput) + 4} (закончил)`
        }
    }

    function addStudent(elems) {
        let student = Object.assign({}, elems);
        delete student.table;
        delete student.sendBtn;
        for (key in student) {
            if (key !== 'birthInput')
                student[key] = student[key].value;
        }
        student.birthInput = student.birthInput.valueAsDate;
        students.push(student);
    }

    function checkInputs(elems) {
        const minBirthDate = new Date('1900-01-01');
        const maxBirthDate = new Date();
        if (!elems.nameInput.value.trim()) {
            alert("Некорректное имя!");
        }
        else if (!elems.surnameInput.value.trim()) {
            alert("Некорректная фамилия!");
        }
        else if (!elems.patronymicInput.value.trim()) {
            alert("Некорректное отчество!");
        }
        else if (elems.birthInput.valueAsDate > maxBirthDate || elems.birthInput.valueAsDate < minBirthDate || elems.birthInput.valueAsDate == null) {
            alert("Некорректная дата рождения!");
        }
        else if (Number(elems.yearInput.value) < 2000) {
            alert("Некорректный год начала обучения!");
        }
        else if (!elems.facultyInput.value.trim()) {
            alert("Некорректный факультет!");
        }
        else {
            addStudent(elems);
            for (key in elems) {
                if (key != 'table' && key != 'sendBtn')
                    elems[key].value = '';
            }
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        function filterTable(inputs) {
            let filtered = students.slice(0);
            let isChanged = false;
            if (inputs.filterName.value) {
                filtered = students.filter(student => processStudent(student).name.includes(inputs.filterName.value));
                isChanged = true;
            }
            if (inputs.filterFaculty.value) {
                filtered = filtered.filter(student => student.facultyInput.includes(inputs.filterFaculty.value));
                isChanged = true;
            }
            if (inputs.filterStart.value) {
                filtered = filtered.filter(student => student.yearInput == inputs.filterStart.value);
                isChanged = true;
            }
            if (inputs.filterFinish.value)
                filtered = filtered.filter(student => Number(student.yearInput) + 4 == inputs.filterFinish.value);
            isChanged = true;
            if (isChanged) {
                updateTable(filtered);
            }
            else {
                updateTable(students);
            }
        }
        function sortTable(key) {
            switch (key) {
                case "name":
                    let updatedStudents = students.slice(0).sort((a, b) => {
                        if (a.nameInput + a.surnameInput + a.patronymicInput > b.nameInput + b.surnameInput + b.patronymicInput) {
                            return 1;
                        }
                        if (a.nameInput + a.surnameInput + a.patronymicInput < b.nameInput + b.surnameInput + b.patronymicInput) {
                            return -1;
                        }
                        return 0;
                    });
                    updateTable(updatedStudents);
                    break;
                case "faculty":
                    let updatedStudents_2 = students.slice(0).sort((a, b) => {
                        if (a.facultyInput > b.facultyInput) {
                            return 1;
                        }
                        if (a.facultyInput < b.facultyInput) {
                            return -1;
                        }
                        return 0;
                    });
                    updateTable(updatedStudents_2);
                    break;
                case "age":
                    let updatedStudents_3 = students.slice(0).sort((a, b) => {
                        if (a.birthInput > b.birthInput) {
                            return 1;
                        }
                        if (a.birthInput < b.birthInput) {
                            return -1;
                        }
                        return 0;
                    });
                    updateTable(updatedStudents_3);
                    break;
                case "date":
                    let updatedStudents_4 = students.slice(0).sort((a, b) => {
                        if (Number(a.yearInput) > Number(b.yearInput)) {
                            return 1;
                        }
                        if (Number(a.yearInput) < Number(b.yearInput)) {
                            return -1;
                        }
                        return 0;
                    });
                    updateTable(updatedStudents_4);
                    break;
                default:
                    break;
            }
        }
        function updateTable(students) {
            let table = document.getElementById('table-body');
            while (true) {
                let elem = document.getElementById('row');
                if (!elem) break;
                elem.remove();
            }
            students.forEach(student => {
                let processed_student = processStudent(student);
                let new_row = document.createElement('tr');
                new_row.classList.add('table__row');
                new_row.setAttribute('id', 'row');

                let name = document.createElement('td');
                name.classList.add('cell');
                name.textContent = processed_student.name;
                new_row.appendChild(name);

                let faculty = document.createElement('td');
                faculty.classList.add('cell');
                faculty.textContent = processed_student.faculty;
                new_row.appendChild(faculty);

                let age = document.createElement('td');
                age.classList.add('cell');
                age.textContent = processed_student.birthDate;
                new_row.appendChild(age);

                let learningYear = document.createElement('td');
                learningYear.classList.add('cell');
                learningYear.textContent = processed_student.learningYear;
                new_row.appendChild(learningYear);

                table.appendChild(new_row);
            });
        }
        const htmlElems = {
            table: document.getElementById('table'),
            nameInput: document.getElementById('name-input'),
            surnameInput: document.getElementById('surname-input'),
            patronymicInput: document.getElementById('patronymic-input'),
            birthInput: document.getElementById('birth-input'),
            yearInput: document.getElementById('year-input'),
            facultyInput: document.getElementById('faculty-input'),
            sendBtn: document.getElementById('send-btn'),
        }
        htmlElems.sendBtn.addEventListener('click', () => checkInputs(htmlElems));
        htmlElems.sendBtn.addEventListener('click', () => updateTable(students));
        let sortBtnName = document.getElementById('sort-btn-name');
        sortBtnName.addEventListener('click', () => sortTable('name'));
        let sortBtnFaculty = document.getElementById('sort-btn-faculty');
        sortBtnFaculty.addEventListener('click', () => sortTable('faculty'));
        let sortBtnBirth = document.getElementById('sort-btn-birth');
        sortBtnBirth.addEventListener('click', () => sortTable('age'));
        let sortBtnYears = document.getElementById('sort-btn-years');
        sortBtnYears.addEventListener('click', () => sortTable('date'));

        let filterName = document.getElementById('filter_name');
        let filterFaculty = document.getElementById('filter_faculty');
        let filterStart = document.getElementById('filter_start');
        let filterFinish = document.getElementById('filter_finish');
        const filterInputs = {
            filterName: document.getElementById('filter_name'),
            filterFaculty: document.getElementById('filter_faculty'),
            filterStart: document.getElementById('filter_start'),
            filterFinish: document.getElementById('filter_finish')
        }
        filterName.addEventListener('input', () => filterTable(filterInputs));
        filterFaculty.addEventListener('input', () => filterTable(filterInputs));
        filterStart.addEventListener('input', () => filterTable(filterInputs));
        filterFinish.addEventListener('input', () => filterTable(filterInputs));
    });
})();