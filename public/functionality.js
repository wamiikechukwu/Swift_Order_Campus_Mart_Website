// Set the configuration for your app
// TODO: Replace with your app's config object

var firebaseConfig = {
    apiKey: 'AIzaSyAUy0Z98qIqoK3jHmDzsiU7QSvbPo1gthg',
    authDomain: 'swift-order-campus-mart.firebaseapp.com',
    databaseURL: 'https://console.firebase.google.com/project/undefined/firestore/data/',
    storageBucket: 'swift-order-campus-mart.appspot.com',
    projectId: 'swift-order-campus-mart'
};
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Get a reference to the storage service, which is used to
// create references in your storage bucket
var storage = firebase.storage();

// Create a storage reference from our storage service
var storageRef = storage.ref();

let imageDownloadLink;

$(function () {
    //--
    let subCategoryValue;
    let options

    //-- VALUES
    let subCategory;
    let subSection;
    let title;
    let shortDescription;
    let longDescription;
    let price;
    let promoPrice
    //--

    let fastFood = ["Rice, Beans & Paste", "Soup & Sauces", "Soup bowls", "Proteins", "Drink & Water", "Swallows", "Yam & Plantain", "Chips", "Finger Foods"]
    let groceries = ["Fruits & Vegetable", "Oil and Spice & Herbs", "Milk, snack and beverages", "Drinks and wines", "Dairy, Cheese and Eggs", "Frozen food", "Caned & Packaged food", "Grains, Pasta & Noodle", "Bread and Bakery", "Meat and Seafood"]
    let houseHold = ["empty"]
    let sport = ["Shop clothing", "Fitness accessories", "Strength Training", "Team Sport Accessories", "Bicycles"]
    let healthCare = ["Safety Glove", "Hand Sanitizer &  Nose Mask", "Menstrual Care", "Toothbrush and Toothpaste (dental care", "Malaria & Fever Drug"]
    let personalCare = ["Make Up", "Haircare", "Body care"]
    let lodge = ["Self cons", "Flat", "Single Rooms", "Boys Quarter"]
    let computer = ["Desktop Computers", "Laptops", "External Hard Disk", "USB Flash Drive", "Anti-Virus & Internet Security", "KeyBoard and Mouse", "Printer & Printer ink/toners", "Batteries & UPS and Chargers", "Video Projector"]
    let phone = ["Small Phones", "Smart Phone", "Charger & Chord", "Android Tablet and Accessories", "Earphones & Bluetooth Headset", "Smart Watches", "Screen Watches", "Screen Protectors and Cases", "Micro SD card and Adapter", "Selfie Sticks & Tripod", "Batteries"]
    let homeFurniture = ["Television & Video Sets", "Generator, Inverter & Stabilizer", "Home Decor", "Beddings", "Kitchen and Dinning Set", "Cloth and Shoe Storage", "Fans and Vacuum Cleaner", "Refrigerator and Cookers", "Air-Condition and Fan", "Washing Machine", "Sitting Room Set"]
    let maleClothing = ["Shirts, Pols and T-Shirts", "Trousers and Jeans", "Boots and Sneakers", "Watches", "Suits/Blazers", "Fragrance and Perfums", "Ties, Belts & Cufflinks", "Hats and Caps", "Track Suits", "Wallets", "Chains", "Rings", "Under wears & Socks"]
    let femaleClothing = ["Gowns & Dresses", "Tops, Tees & Polos", "Skirts", "UnderWears & Lingeries", "Trousers & Jean", "SleepWears/Pyjamas", "Shorts & Bumshots and Socks", "Watchess", "Perfumes & Fragrances", "Sandals and Slippers", "Casual Boots and Sneakers", "Earrings and Necklace", "Sunglasses", "Handbag", "Suits"]
    let handyMan = ["Phone Repairs", "House Hold Electronic Repairs", "Painter", "Home Cleaning Service", "Dry Cleaner", "Plumbers"]
    let assignment = ["Year 1 Online Registration", "Typing, Printing & Photocopier work", "Project One"]
    let others = ["Baggage & Luggage", "Books and Stationary"]

    let subsectionsArr = [undefined, fastFood, groceries, houseHold, sport, healthCare, personalCare, lodge, computer, phone, homeFurniture, maleClothing, femaleClothing, handyMan, assignment, others];

    //file reader
    let fileReader = new FileReader();

    document.getElementById('categorySubDataList').addEventListener("change", function () {
        subCategoryValue = this.value;

        setSubSectionValue(subCategoryValue);
    });

    function setSubSectionValue(subCategoryIndex) {
        let subSection = $("#categorySubSection");

        subSection.empty();

        for (let item of subsectionsArr[subCategoryIndex]) {
            options = document.createElement("option")
            options.textContent = item;
            subSection.append(options);
        }
    }

    $("#addItemForm").submit(function (e) {
        e.preventDefault();
        let newCatArray = [undefined, "Fast Food", "Groceries", "House hold & Kitchen Essentials", "Sport & Fitness", "Healthcare & Pharmacy", "Lodge For Rent", "Computer & Accessories", "Phone & Accessories", "Home Furniture & Appliances", "Male Clothing & Accessories", "Female Clothing & Accessories", "Handyman & Services", "Assignment & Project Assistance", "Other"]
        subCategory = $("#categorySubDataList").val();
        subSection = $("#categorySubSection").val()
        title = $("#subSectionTitle").val()
        shortDescription = $("#subSectionShortDescription").val()
        longDescription = $("#subSectionLongDescription").val()
        price = $("#subSectionPrice").val()
        promoPrice = $("#subSectionPromoPrice").val()

        let subCat = newCatArray[subCategory];


        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                db.collection("category").doc(subCat).collection(subSection).doc(title).set({
                    shortDes: shortDescription,
                    longDes: longDescription,
                    price: price,
                    prompPrice: promoPrice,
                    file: imageDownloadLink
                }).then(() => {
                    alert("Product successfully saved ");
                })
                    .catch((error) => {
                        alert("Did not save product successfully");
                    })
                // ...
            } else {
                alert("User is not login ")

            }
        });
    });

});

let fileInput = document.getElementById("ProductFile");
fileInput.addEventListener("change", function (e) {
    let productTitleForImageUpload = document.getElementById("subSectionTitle").value
    let file = e.target.files[0];
    let imageRef = storageRef.child(`${productTitleForImageUpload}/${file.name}`);
    imageRef.put(file).then((snapshot) => {
        console.log('Uploaded a blob or file!' + file);

        snapshot.ref.getDownloadURL().then(function (url){
            imageDownloadLink = url
            console.log('download link is ' + url);
        })

    });
});



