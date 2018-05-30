$(document).ready(function () {
    
    $('#form-company').parsley(ParsleyConfig.options);

    var API_URL = document.getElementById('apiUrl').value;
    
    getDefaultCompany(API_URL)
        .then(function(id){
            loadCompany(API_URL, id);
        })
        .catch(function(error){
            console.log(error);
        });

    $('#btnSave').on('click', function () {
        var isFormValid = $('#form-company').parsley().validate();

        if (isFormValid) {
            getCompanyData()
                .then(function(company){
                    updateCompany(API_URL, companyId, company);
                })
                .catch(function(error){
                    console.log(error);
                });
        }
    });
});

function getDefaultCompany(API_URL) {
    return new Promise(function(resolve, reject){
        $.ajax({
            url: API_URL + '/company',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                resolve(data[0]._id);
            },
            error: function (err, data) {
                reject('Não foi possível obter os dados da Empresa');
            }
        });
    });

}

function getCompanyData() {
    return new Promise(function(resolve, reject){
        var company = {
            name: document.getElementById('name').value,
            corporateName: document.getElementById('corporate-name').value,
            zipcode: document.getElementById('zipcode').value || null,
            address: document.getElementById('address').value,
            addressLine2: document.getElementById('address-2').value || null,
            addressNumber: document.getElementById('address-number').value || null,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            country: document.getElementById('country').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            phoneSecondary: document.getElementById('phone-secondary').value || null,
            website: document.getElementById('website').value || null,
            facebook: document.getElementById('facebook').value || null,
            instagram: document.getElementById('instagram').value || null,
        }
        resolve(company);
    });
}

function updateCompany(API_URL, companyId, company) {
    $.ajax({
        url: API_URL + '/company/' + companyId,
        type: 'PUT',
        dataType: 'json',
        data: company,
        success: function (data) {
            alert('Empresa atualizada com sucesso.');
        },
        error: function (err, data) {
            console.log('Erro ao atualizar a Empresa.');
        }
    });
}

function loadCompany(API_URL, companyId) {
    $.ajax({
        url: API_URL + '/company/' + companyId,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            document.getElementById('name').value = data.name;
            document.getElementById('corporate-name').value = data.corporateName;
            document.getElementById('zipcode').value = data.zipcode || null;
            document.getElementById('address').value = data.address;
            document.getElementById('address-2').value = data.addressLine2 || null;
            document.getElementById('address-number').value = data.addressNumber;
            document.getElementById('city').value = data.city;
            document.getElementById('state').value = data.state;
            document.getElementById('country').value = data.country;
            document.getElementById('email').value = data.email;
            document.getElementById('phone').value = data.phone;
            document.getElementById('phone-secondary').value = data.phoneSecondary || null;
            document.getElementById('website').value = data.website || null;
            document.getElementById('facebook').value = data.facebook || null;
            document.getElementById('instagram').value = data.instagram || null;
        },
        error: function (err, data) {
            console.log('Erro ao carregar os dados da Empresa.');
        }
    });
}
