'use strict';

$(document).ready(function () {
    
    $('#form-customer').parsley(ParsleyConfig.options);

    var API_URL = document.getElementById('apiUrl').value;

    $('#name').on('focusout', function(){
        setNames();
    });

    $('#btnSave').on('click', function () {
        var isFormValid = $('#form-customer').parsley().validate();

        if (isFormValid) {
            getCustomerData()
                .then(function(customer){
                    if(!customer.id){
                        createCustomer(API_URL, customer);
                    }else{
                        updateCustomer(API_URL, customer);
                    }
                })
                .catch(function(error){
                    console.log(error);
                });
        }
    });
});

function setNames(){
    var name = document.getElementById('name').value.trim();
    if(name.length > 0){
        var names = name.split(" ");
    
        var firstName = names[0];
        var lastName = names[names.length-1];
    
        document.getElementById('first-name').value = firstName;
        document.getElementById('last-name').value = lastName;
    }    
}

function getCustomerData() {
    return new Promise(function(resolve, reject){
        var customer = {
            id: document.getElementById('id').value,
            name: document.getElementById('name').value,
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            email: document.getElementById('email').value,
            identificationNumber: document.getElementById('identification-number').value,
            postalCode: document.getElementById('postal-code').value || null,
            address: document.getElementById('address').value || null,
            addressLine2: document.getElementById('address-line2').value || null,
            addressNumber: document.getElementById('address-number').value || null,
            addressNeighbourhood: document.getElementById('address-neighbourhood').value || null,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            country: document.getElementById('country').value,
            phone: document.getElementById('phone').value,
            phoneSecondary: document.getElementById('phone-secondary').value,
            company: document.getElementById('company').value
        }
        resolve(customer);
    });
}

function createCustomer(API_URL, customer) {
    $.ajax({
        url: API_URL + '/customer',
        type: 'POST',
        dataType: 'json',
        data: customer,
        success: function (data) {
            var id = data._id;
            window.location.href = '/customers/' + id + '/edit';
        },
        error: function (err, data) {
            alert('Erro ao cadastar o Cliente.');
        }
    });
}

function updateCustomer(API_URL, customer) {
    $.ajax({
        url: API_URL + '/customer/' + customer.id,
        type: 'PUT',
        dataType: 'json',
        data: customer,
        success: function (data) {
            alert('Cliente atualizado com sucesso.');
        },
        error: function (err, data) {
            console.log('Erro ao atualizar o Cliente.');
        }
    });
}
