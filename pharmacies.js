var pharmaciesList = new Vue({
    el: '#pharmacy-list',
    data: {
        pharmacies: [],
    },
    methods: {
        addPharmacy: function() {
            this.pharmacies.push({
                name: prompt('Pharmacy name'),
            });

            jQuery.ajax({
                url: 'http://pharmacy-api.swarmer.me/pharmacies',
                method: 'PUT',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(this.pharmacies),
            });
        },
        removePharmacy: function(pharmacyName) {
            this.pharmacies = this.pharmacies.filter(function (pharmacy) {
                return pharmacy.name != pharmacyName;
            });

            jQuery.ajax({
                url: 'http://pharmacy-api.swarmer.me/pharmacies',
                method: 'PUT',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(this.pharmacies),
            });
        },
    }
});

jQuery.ajax({
    url: 'http://pharmacy-api.swarmer.me/pharmacies',
    success: function(data, textStatus, jqXHR) {
        pharmaciesList.pharmacies = data;
    },
});
