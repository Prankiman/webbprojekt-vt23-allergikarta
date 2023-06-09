import axios from 'axios';


//  selects svg path and deselects all other paths 
document.querySelectorAll('path').forEach(svg_path => {
  svg_path.addEventListener('click', () => {

    document.querySelectorAll('.municipality').forEach(municipality => { municipality.setAttribute('value', svg_path.getAttribute('name')!) }); // auto fills part of form

    document.querySelectorAll('path').forEach(svg_path => {
      svg_path.setAttribute('class', '');
    });
    let selected: string = svg_path.getAttribute('class');
    if (selected == 'selected') {
      svg_path.setAttribute('class', '');
    }
    else
      svg_path.setAttribute('class', 'selected');


  })
});

//___________________FORMS__AND__REQUESTS___________________________________________________________

const add_restaurant_form: HTMLFormElement = document.querySelector('#add_form')!;
const search_restaurant_form: HTMLFormElement = document.querySelector('#search_form')!;


add_restaurant_form.onsubmit = () => {

  //  posting data
  let form_data = {
    title: document.querySelector('.restaurant_name')!.value.toLowerCase(),
    municipality: document.querySelectorAll('.municipality')[0].value.toLowerCase(),
    gluten_free: document.querySelectorAll('.free_from_gluten')[0].value.toLowerCase(),
    lactose_free: document.querySelectorAll('.free_from_lactose')[0].value.toLowerCase(),
    rating: document.querySelector('.rating')!.value
  };
  console.log(form_data)

  axios.post('http://127.0.0.1:8081/add_restaurant', form_data);

  return false;
};

search_restaurant_form.onsubmit = () => {
  //  retrieving data
  let form_data = {
    municipality: document.querySelectorAll('.municipality')[1].value.toLowerCase(),
    gluten_free: document.querySelectorAll('.free_from_gluten')[1].value.toLowerCase(),
    lactose_free: document.querySelectorAll('.free_from_lactose')[1].value.toLowerCase(),
  };

  console.log(axios.get(`http://127.0.0.1:8081/${form_data.municipality}/${form_data.gluten_free}/${form_data.lactose_free}`));

  return false; // prevent reload
};

//___________________________________________________________________________________________________