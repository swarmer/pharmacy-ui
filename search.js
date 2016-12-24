var searchForm = new Vue({
    el: '#search-form',
    data: {
        drugs: [],
        pharmacies: [],

        all_sections: [],
        all_pharmacies: [],
    },
    methods: {
        search: function(event) {
            var searchString = event.target.value.toLowerCase();

            var drugs = [];
            for (section of this.all_sections) {
                var matchingDrugs = section.drugs.filter(function (drug) {
                    if (searchString === '')
                        return false;

                    return drug.name.toLowerCase().indexOf(searchString) !== -1;
                });

                drugs.push.apply(drugs, matchingDrugs);
            }
            this.drugs = drugs;

            this.pharmacies = this.all_pharmacies.filter(function (pharmacy) {
                if (searchString === '')
                    return false;

                return pharmacy.name.toLowerCase().indexOf(searchString) !== -1;
            });
        },
    }
});


jQuery.ajax({
    url: 'http://pharmacy-api.swarmer.me/drugs',
    success: function(data, textStatus, jqXHR) {
        searchForm.all_sections = data;
    },
});

jQuery.ajax({
    url: 'http://pharmacy-api.swarmer.me/pharmacies',
    success: function(data, textStatus, jqXHR) {
        searchForm.all_pharmacies = data;
    },
});
