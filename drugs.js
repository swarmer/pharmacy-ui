var drugsList = new Vue({
    el: '#drug-list',
    data: {
        sections: [],
    },
    methods: {
        addDrug: function(sectionName) {
            for (section of this.sections) {
                if (section.name !== sectionName)
                    continue;

                section.drugs.push({
                    name: prompt('Drug name')
                });
            }

            jQuery.ajax({
                url: 'http://pharmacy-api.swarmer.me/drugs',
                method: 'PUT',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(this.sections),
            });
        },
        removeDrug: function(sectionName, drugName) {
            for (section of this.sections) {
                if (section.name !== sectionName)
                    continue;

                section.drugs = section.drugs.filter(function (drug) {
                    return drug.name != drugName;
                });
            }

            jQuery.ajax({
                url: 'http://pharmacy-api.swarmer.me/drugs',
                method: 'PUT',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(this.sections),
            });
        },
        removeSection: function(sectionName) {
            this.sections = this.sections.filter(function (section) {
                return section.name != sectionName;
            });

            jQuery.ajax({
                url: 'http://pharmacy-api.swarmer.me/drugs',
                method: 'PUT',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(this.sections),
            });
        },
        addSection: function() {
            this.sections.push({
                name: prompt('Section name'),
                drugs: []
            });

            jQuery.ajax({
                url: 'http://pharmacy-api.swarmer.me/drugs',
                method: 'PUT',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(this.sections),
            });
        }
    }
});

jQuery.ajax({
    url: 'http://pharmacy-api.swarmer.me/drugs',
    success: function(data, textStatus, jqXHR) {
        drugsList.sections = data;
    },
});
