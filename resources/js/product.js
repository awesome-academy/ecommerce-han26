import axios from 'axios';
import path from 'path';

(async () => {
  if (window.location.pathname === path.resolve('product', 'list')) {
    const productImageRootPath = path.resolve('img', 'product-img');
    const lang = document.getElementsByTagName('html')[0].lang || '';

    // THẺ SẢN PHẨM

    // Tạo thẻ sản phẩm
    const productListContainer = document.getElementById('productList'),
      singleItem = document.createElement('div'),
      wrapper = document.createElement('div'),
      imageContainer = document.createElement('div'),
      img01 = document.createElement('img'),
      img02 = document.createElement('img'),
      discountBadgeContainer = document.createElement('div'),
      discountBadge = document.createElement('span'),
      newBadgeContainer = document.createElement('div'),
      newBadge = document.createElement('span'),
      favoriteContainer = document.createElement('div'),
      favoriteButton = document.createElement('a'),
      descriptionContainer = document.createElement('div'),
      brandName = document.createElement('span'),
      productNameContainer = document.createElement('a'),
      productName = document.createElement('h6'),
      priceContainer = document.createElement('p'),
      oldPrice = document.createElement('span'),
      hoverContent = document.createElement('div'),
      buttonContainer = document.createElement('div'),
      button = document.createElement('a');

    // Lồng các thẻ vào nhau
    singleItem.appendChild(wrapper);
    wrapper.appendChild(imageContainer);
    imageContainer.appendChild(img01);
    imageContainer.appendChild(img02);
    discountBadgeContainer.appendChild(discountBadge);
    imageContainer.appendChild(newBadgeContainer);
    newBadgeContainer.appendChild(newBadge);
    imageContainer.appendChild(favoriteContainer);
    favoriteContainer.appendChild(favoriteButton);
    wrapper.appendChild(descriptionContainer);
    descriptionContainer.appendChild(brandName);
    descriptionContainer.appendChild(productNameContainer);
    productNameContainer.appendChild(productName);
    descriptionContainer.appendChild(priceContainer);
    descriptionContainer.appendChild(hoverContent);
    hoverContent.appendChild(buttonContainer);
    buttonContainer.appendChild(button);

    // Thêm class và attribute cho thẻ
    singleItem.classList.add('col-12', 'col-sm-6', 'col-lg-4');
    wrapper.classList.add('single-product-wrapper');
    imageContainer.classList.add('product-img');
    img01.src = path.resolve(productImageRootPath, 'product-1.jpg');
    img01.alt = '';
    img02.classList.add('hover-img');
    img02.src = path.resolve(productImageRootPath, 'product-2.jpg');
    img02.alt = '';
    discountBadgeContainer.classList.add('product-badge', 'offer-badge');
    discountBadge.innerText = '50%'; /////
    newBadgeContainer.classList.add('product-badge', 'new-badge');
    favoriteContainer.classList.add('product-favourite');
    favoriteButton.href = '#';
    favoriteButton.classList.add('favme', 'fa', 'fa-heart');
    descriptionContainer.classList.add('product-description');
    brandName.innerText = 'No Brand'; /////
    productNameContainer.href = '#';
    priceContainer.classList.add('product-price');
    oldPrice.classList.add('old-price');
    hoverContent.classList.add('hover-content');
    buttonContainer.classList.add('add-to-cart-btn');
    button.href = '#';
    button.classList.add('btn', 'essence-btn');

    // i18n trong thẻ
    switch (lang) {
      case 'vi':
        newBadge.innerText = 'Mới';
        button.innerText = 'Thêm vào giỏ';
        break;
      default:
        newBadge.innerText = 'New';
        button.innerText = 'Add to Cart';
    }

    // Số sản phẩm trong 1 trang
    const pageItemsNumber = 15;

    // Lấy dữ liệu của tất cả các sản phẩm từ API
    const products = await axios.get(path.resolve('api', 'products'));

    // Đặt product price là min của các product detail
    products.data.forEach((product) => {
      product.price = product.product_details.length
        ? product.product_details.reduce((min, curProduct) => {
            return curProduct.price < min ? curProduct.price : min;
          }, Number.MAX_SAFE_INTEGER)
        : 0;
    });

    // mảng chứa dữ liệu các sản phẩm sau khi đã lọc
    let filtedProducts = products.data.filter(() => {
      return true;
    });

    // Hàm hiển thị sản phẩm theo trang và mảng dữ liệu đầu vào
    const showProducts = (pageNumber, productsArr) => {
      const productsPage = productsArr.slice(
        (pageNumber - 1) * pageItemsNumber,
        pageNumber * pageItemsNumber
      );

      // xoá các trang cũ
      productListContainer.innerHTML = '';

      // hiển thị
      productsPage.forEach((product) => {
        productName.innerText = product.name;

        priceContainer.innerHTML = '';
        priceContainer.innerHTML += '$' + product.price;

        productListContainer.appendChild(singleItem.cloneNode(true));
      });
      document.querySelector('.total-products > p > span').innerText =
        filtedProducts.length;
    };

    // Số trang nhỏ nhất và lớn nhất
    let minPageNumber = 1,
      maxPageNumber = Math.floor(filtedProducts.length / pageItemsNumber) + 1;

    // Số trang hiện tại và mảng các phần tử phân trang
    let currentPage = minPageNumber,
      paginationArr = [
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      ];

    // hiển thị các sản phẩm lúc đầu (trang 1)
    showProducts(minPageNumber, filtedProducts);

    // tạo pagination
    const pagination = document.querySelector('.pagination'),
      pageItem = document.createElement('li'),
      pageLink = document.createElement('a'),
      scrollUpBtn = document.getElementById('scrollUp');

    pageItem.appendChild(pageLink);

    pageItem.classList.add('page-item');
    pageLink.classList.add('page-link');
    pageLink.href = '#';

    // hiển thị pagination theo mảng paginationArr
    const showPagination = () => {
      const paginationChilds = pagination.children;

      // xoá các pagination cũ
      while (paginationChilds.length > 2) {
        pagination.removeChild(paginationChilds[1]);
      }

      // hiển thị và thêm sự kiên
      paginationArr.forEach((value) => {
        if (value > 0 && value <= maxPageNumber) {
          pageLink.innerText = value;
          pageLink.setAttribute(
            'style',
            value === currentPage ? 'color: #0056b3' : 'color: #787878'
          );

          const clonedNode = pageItem.cloneNode(true);

          // thêm sự kiện
          clonedNode.childNodes[0].addEventListener('click', (e) => {
            e.preventDefault();
            scrollUpBtn.click();

            const tempVal = value;

            // hiển thị trang mới
            showProducts(tempVal, filtedProducts);

            paginationArr = paginationArr.map((itemValue) => {
              return itemValue + tempVal - currentPage;
            });
            currentPage = tempVal;

            // hiển thị pagination mới
            showPagination();
          });

          // hiển thị các pagination mới
          pagination.insertBefore(
            clonedNode,
            paginationChilds[paginationChilds.length - 1]
          );
        }
      });
    };

    // thêm sự kiện cho mũi tên trái ( < ) của pagination
    pagination.children[0].addEventListener('click', (e) => {
      e.preventDefault();
      if (currentPage > minPageNumber) {
        scrollUpBtn.click();
        showProducts(currentPage - 1, filtedProducts);

        paginationArr = paginationArr.map((itemValue) => {
          return itemValue - 1;
        });

        currentPage = currentPage - 1;
        showPagination();
      }
    });

    // thêm sự kiện cho mũi tên phải ( > ) của pagination
    pagination.children[pagination.children.length - 1].addEventListener(
      'click',
      (e) => {
        e.preventDefault();
        if (currentPage < maxPageNumber) {
          scrollUpBtn.click();
          showProducts(currentPage + 1, filtedProducts);

          paginationArr = paginationArr.map((itemValue) => {
            return itemValue + 1;
          });

          currentPage = currentPage + 1;
          showPagination();
        }
      }
    );

    // Hiển thị pagination lúc đầu
    showPagination();

    // Tìm giá sản phẩm nhỏ nhất và lớn nhất
    const minPrice = Math.floor(
        filtedProducts.reduce((min, product) => {
          return product.price < min ? product.price : min;
        }, Number.MAX_SAFE_INTEGER)
      ),
      maxPrice =
        Math.floor(
          filtedProducts.reduce((max, product) => {
            return product.price > max ? product.price : max;
          }, 0)
        ) + 1;

    // giá trị hiện tại
    let currentMinPrice = minPrice,
      currentMaxPrice = maxPrice,
      currentColor = 'none';

    // hàm lọc sản phẩm
    const filterProducts = () => {
      filtedProducts = products.data.filter((product) => {
        const colorFilter =
            currentColor === 'none'
              ? true
              : product.product_details.length &&
                product.product_details.reduce((haveColor, detail) => {
                  return haveColor || detail.color === currentColor;
                }, false),
          priceFilter =
            product.price >= currentMinPrice &&
            product.price <= currentMaxPrice;
        return colorFilter && priceFilter;
      });

      // hiển thị lại sản phẩm
      showProducts(minPageNumber, filtedProducts);
      // cập nhật lại số trang lớn nhất khi số sản phẩm thay đổi
      maxPageNumber = Math.floor(filtedProducts.length / pageItemsNumber) + 1;

      // chuyển về trang thứ nhất
      if (currentPage > minPageNumber) {
        currentPage = minPageNumber;
        paginationArr = [
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
        ];
      }
      // hiển thị lại pagination
      showPagination();
    };

    // lấy thanh trượt lọc giá
    const priceSlider = document.querySelector('.slider-range-price');

    // đặt thuộc tính
    priceSlider.setAttribute('data-min', minPrice);
    priceSlider.setAttribute('data-max', maxPrice);
    priceSlider.setAttribute('data-value-min', minPrice);
    priceSlider.setAttribute('data-value-max', maxPrice);

    document.querySelector('.range-price').innerText =
      priceSlider.getAttribute('data-label-result') +
      ' $' +
      minPrice +
      ' - ' +
      ' $' +
      maxPrice;

    // xử lý và thêm sự kiện
    $('.slider-range-price').each(function () {
      const min = jQuery(this).data('min'),
        max = jQuery(this).data('max'),
        unit = jQuery(this).data('unit'),
        value_min = jQuery(this).data('value-min'),
        value_max = jQuery(this).data('value-max'),
        label_result = jQuery(this).data('label-result'),
        t = $(this);
      $(this).slider({
        range: true,
        min: min,
        max: max,
        values: [value_min, value_max],
        slide: function (event, ui) {
          const result =
            label_result +
            ' ' +
            unit +
            ui.values[0] +
            ' - ' +
            unit +
            ui.values[1];
          t.closest('.slider-range').find('.range-price').html(result);
        },
        stop: async (event, ui) => {
          currentMinPrice = ui.values[0];
          currentMaxPrice = ui.values[1];
          filterProducts();

          showProducts(minPageNumber, filtedProducts);
          maxPageNumber =
            Math.floor(filtedProducts.length / pageItemsNumber) + 1;

          if (currentPage > minPageNumber) {
            currentPage = minPageNumber;
            paginationArr = [
              currentPage - 2,
              currentPage - 1,
              currentPage,
              currentPage + 1,
              currentPage + 2,
            ];
          }
          showPagination();
        },
      });
    });

    // các bộ lọc theo màu
    const colorFilters = [
      'white',
      'gray',
      'black',
      'blue',
      'red',
      'yellow',
      'orange',
      'brown',
      'green',
      'pupple',
    ];

    // thêm sự kiện cho từng màu
    colorFilters.forEach((filter, index) => {
      document
        .querySelector('.color' + (index + 1))
        .addEventListener('click', () => {
          currentColor =
            currentColor === 'none' || currentColor !== filter
              ? filter
              : 'none';
          filterProducts();

          showProducts(minPageNumber, filtedProducts);
          maxPageNumber =
            Math.floor(filtedProducts.length / pageItemsNumber) + 1;

          if (currentPage > minPageNumber) {
            currentPage = minPageNumber;
            paginationArr = [
              currentPage - 2,
              currentPage - 1,
              currentPage,
              currentPage + 1,
              currentPage + 2,
            ];
          }
          showPagination();
        });
    });
  }
})();
