var App = window.App || {};
QUnit.test('DataStore', function(assert) {
    var ds = new App.DataStore();

    ds.add('m@bond.com', 'tea');
    ds.add('james@bond.com', 'eshpressho');

    assert.deepEqual(ds.getAll(), {
        'm@bond.com': 'tea',
        'james@bond.com': 'eshpressho'
    });

    ds.remove('james@bond.com');
    assert.deepEqual(ds.getAll(), {
        'm@bond.com': 'tea'
    });

    assert.equal(ds.get('m@bond.com'), 'tea');
    assert.equal(ds.get('james@bond.com'), undefined);
});
//In the truck.js the functions defined till now did not retrun the truck objects.
//So, I have declared a function getAllTruckObjects() which would return all truck objects
//This function would help in comparing the values.
QUnit.test('truck', function(assert) {

    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var myTruck = new Truck('ncc-1701', new DataStore());

    myTruck.createOrder({
        emailAddress: 'me@goldfinger.com',
        coffee: 'double mocha'
    });
    myTruck.createOrder({
        emailAddress: 'dr@no.com',
        coffee: 'decaf'
    });
    myTruck.createOrder({
        emailAddress: 'm@bond.com',
        coffee: 'earl grey'
    });

    myTruck.printOrders();

    assert.deepEqual(myTruck.getAllTruckObjects(), {
        'me@goldfinger.com': {
            coffee: 'double mocha',
            emailAddress: 'me@goldfinger.com'
        },
        'dr@no.com': {
            coffee: 'decaf',
            emailAddress: 'dr@no.com'
        },
        'm@bond.com': {
            coffee: 'earl grey',
            emailAddress: 'm@bond.com'
        }
    });
    myTruck.deliverOrder('dr@no.com');
    myTruck.deliverOrder('m@bond.com');
    myTruck.printOrders();

    assert.deepEqual(myTruck.getAllTruckObjects(), {
        'me@goldfinger.com': {
            coffee: 'double mocha',
            emailAddress: 'me@goldfinger.com'
        }
    });
});
