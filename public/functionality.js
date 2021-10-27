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

let imageDownloadLink = [];

$(function () {
    //--
    let subCategoryValue;
    let options

    //-- VALUES
    let subCategory;
    let productSubCat;
    let title;
    let shortDescription;
    let longDescription;
    let price;
    let promoPrice;
    let vendorName;
    let vendorPhoneNum;
    //--

    let fastFood = ["Rice,beans and pasta", "Soups and sauces", "Soup bowls", "Protein", "Drinks and water", "Swallows", "Yam and  Plantain", "Chips", "Protein", "Finger foods"]
    let groceries = ["Fruit and Vegetables", "Oil, Spice and herbs", "Milk , snacks and beverages", "Drinks and" +
    " wines", "Dairy, Cheese, and Eggs", "Frozen food", "Caned and Packaged food", "Grains, Pasta and Noodle", "Bread" +
    " and Bakery", "Meats and Seafood"]
    let houseHold = ["Bathroom, toilet cleaners","Dish and kitchen cleaners","Brushes mops buckets","Air freshener" +
    " and fragrances","Kitchen towels and serviettes","Plates and spoons","Soaps and detergent","Kitchen utensils","Microwave ovens ,blenders and toasters"]
    let sport = ["Sports clothing", "Fitness accessories", "Strength training", "Team sport accessories", "Bicycles"]
    let healthCare = ["Safety glove", "Hand Sanitizer &  Nose Mask", "Menstrual Care", "Toothbrush and Toothpaste", "Malaria & Fever Drug"]
    let personalCare = ["Make Up", "Haircare", "Body creams"]
    let lodge = ["Self cons", "Flats", "Single rooms", "Boys Quarter"]
    let computer = ["Desktop Computers", "Laptops", "External Hard Disk", "USB Flash Drive & memory cards", "Anti-Virus &" +
    " Internet Security", "Keyboard and Mouse", "Printers & printer ink", "Batteries & UPS and Chargers", "Video projectors"]
    let phone = ["Small Phones", "Smart phones", "Charger & Chord", "Android Tablet and Accessories", "Earphones & Bluetooth Headset", "Smart Watches", "Screen protectors and cases", "Micro SD card and adapters", "Selfie stick and tripod", "Batteries"]
    let homeFurniture = ["Television & Video Sets", "Generator, Inverter & Stabilizer", "Home Decor", "Beddings", "Kitchen and Dinning Set", "Cloth and Shoe Storage","Ironing and laundry","Fans and Vacuum Cleaner", "Refrigerator and Cookers", "Air-Condition and Fan", "Washing Machine", "Sitting Room Set"]
    let maleClothing = ["Shirts, Polos and t-Shirts", "Trousers and Jeans", "Boots and Sneakers", "Watches", "Suits" +
    " & Blazers", "Fragrances and Perfumes", "Ties, Belts & Cufflinks", "Hats and Caps", "Track Suits", "Wallets", "Chains", "Rings", "Under wears & Socks"]
    let femaleClothing = ["Gowns & Dresses", "Tops, Tees & Polos", "Skirts", "UnderWears & Lingeries", "Trousers &" +
    " Jean", "SleepWears & Pyjamas", "Shorts & Bumshots and Socks", "Watchess", "Perfumes & Fragrances", "Sandals and" +
    " Slippers", "Casual Boots and Sneakers", "Earrings and Necklace", "Sunglasses", "Handbag", "Suits"]
    let handyMan = ["Phone Repairs", "House Hold Electronic Repairs", "Painter", "Home Cleaning Service", "Dry Cleaner", "Plumbers"]
    let assignment = ["Year 1 Online Registration", "Typing, Printing & Photocopier work", "Project Work"]
    let others = ["Baggage & Luggage", "Books and Stationary"]

    let subsectionsArr = [undefined, fastFood, groceries, houseHold, sport, healthCare, personalCare, lodge, computer, phone, homeFurniture, maleClothing, femaleClothing, handyMan, assignment, others];

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
        let newCatArray = [undefined, "Fast Food", "Groceries", "House hold & Kitchen Essentials", "Sport & Fitness", "Healthcare & Pharmacy", "Personal Care & Beauty", "Lodge For Rent", "Computer & Accessories", "Phone & Accessories", "Home Furniture & Appliances", "Male Clothing & Accessories", "Female Clothing & Accessories", "Handyman & Services", "Assignment & Project Assistance", "Other"]
        subCategory = $("#categorySubDataList").val();
        productSubCat = $("#categorySubSection").val()
        title = $("#productTitle").val()
        shortDescription = $("#subSectionShortDescription").val()
        longDescription = $("#subSectionLongDescription").val()
        price = $("#subSectionPrice").val()
        promoPrice = $("#subSectionPromoPrice").val()
        vendorName = $("#vendorName").val()
        vendorPhoneNum = $("#vendorPhoneNum").val()


        let productCat = newCatArray[subCategory];


        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                db.collection("product").doc(proXductCat).collection(productSubCat).doc().set({
                    title: title,
                    shortDes: shortDescription,
                    longDes: longDescription,
                    price: price,
                    promoPrice: promoPrice,
                    vendorName: vendorName,
                    vendorPhoneNum: vendorPhoneNum,
                    file: imageDownloadLink,
                    productCategory: productCat,
                    productSubCategory: productSubCat
                }).then(() => {
                    alert("Product successfully saved ");
                    location.reload()
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
    let productTitleForImageUpload = document.getElementById("productTitle").value
    //---DELETE
    let totalImages = e.target.files.length

    for (let i = 0; i < totalImages; i++) {
        let file = e.target.files[i];

        let imageRef = storageRef.child(`${productTitleForImageUpload}/${file.name}`);
        imageRef.put(file).then((snapshot) => {
            console.log('Uploaded a blob or file!' + file);

            snapshot.ref.getDownloadURL().then(function (url) {
                imageDownloadLink [i] = url
                console.log('download link is ' + url);
                alert(`Successfully added ${file.name}`)
            })

        });


    }
});



