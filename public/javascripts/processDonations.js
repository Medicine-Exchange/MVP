const imageList = {};
const medicines = [];
let startingImageId = 1;
let startingMedicineId = 1;
const userId = localStorage.getItem('userId');

if (sessionStorage.getItem('images') && sessionStorage.getItem('medicines')) {
    window.location.href = 'checkout';
}

fetch(`https://a6onovzgof.execute-api.ap-south-1.amazonaws.com/dev/users?userId=${userId}`, {
    method: 'GET'
}).then(response => response.json()).then(data => {
    if (!Object.keys(data).length) {
        window.location.href = 'userProfile'
    }
}).catch((error) => {
    console.error('Error:', error);
});

$(".imgAdd").click(function () {
    $(this).closest(".row").find('.imgAdd').before(`<div class="col-sm-2 imgUp" id="img_${startingImageId}"><div class="imagePreview"></div><label class="btn btn-primary">Upload<input type="file" class="uploadFile img" value="Upload Photo" style="width:0px;height:0px;overflow:hidden;"></label><i class="fa fa-times del"></i></div>`);
    startingImageId++;
});
$(document).on("click", "i.del", function () {
    $(this).parent().remove();
    imageList[$(this).parent()[0].id.split('_')[1]] = null;
});
$(function () {
    $(document).on("change", ".uploadFile", function () {
        var uploadFile = $(this);
        var files = !!this.files ? this.files : [];
        if (!files.length || !window.FileReader) return;

        if (/^image/.test(files[0].type)) {
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);

            reader.onloadend = function () {
                var format = files[0].name.split('.').pop().toLowerCase();
                imageList[uploadFile.parent().parent()[0].id.split('_')[1]] = {
                    format,
                    data: this.result
                };
                uploadFile.closest(".imgUp").find('.imagePreview').css("background-image", "url(" + this.result + ")");
            }
        }
    });
});

$('#addMedicine').on('click', function () {
    const template = `
    <div class="form-inline" id="${startingMedicineId}">
        <div class="form-group">
            <label>Name of the Medicine</label>
            <input id="nmed_${startingMedicineId}" type="text" name="medicine_name" placeholder="Name of the Medicine">
        </div>
        <div class="form-group">
            <label>Type</label>
            <select id="selmed_${startingMedicineId}">
                <option disabled>Type of the Medicine</option>
                <option>Tablets</option>
                <option>Capsule</option>
                <option>Syrup</option>
                <option>Powder</option>
                <option>Injection</option>
                <option>Ointment</option>
                <option>Accessories</option>
            </select>
        </div>
        <div class="form-group">
            <label>Quantity</label>
            <input id="qmed_${startingMedicineId}" type="number" min="1" value="1" placeholder="Quantity of the Medicine">
        </div>
        <div class="form-group">
            <i class="fa fa-times removeMedicine"></i>
        </div>
    </div>
    <br>
    `
    startingMedicineId++;
    $(template).insertBefore($(this));
})

$(document).on('click', '.removeMedicine', function () {
    $(this).parent().parent().next('br').remove();
    $(this).parent().parent().remove();
})

$('#donate').on('click', function () {
    const medicines = [];
    const images = [];
    if (Object.keys(imageList).length) {
        $('.form-inline').each(function (index, currentElement) {
            const id = currentElement.id;
            const name = document.getElementById(`nmed_${id}`).value;
            const type = document.getElementById(`selmed_${id}`).value;
            const quantity = document.getElementById(`qmed_${id}`).value;

            if (name && type && quantity) {
                medicines.push({
                    medicineDetails: {
                        name,
                        type
                    },
                    quantity
                })
            }
        });
        for (const image in imageList) {
            if (image) {
                images.push(imageList[image]);
            }
        }
        sessionStorage.clear();
        sessionStorage.setItem("images", JSON.stringify(images));
        sessionStorage.setItem("medicines", JSON.stringify(medicines));
        window.location.href = `checkout`;
    } else {
        alert('Sorry, you need to upload minimum one image.')
    }
})
