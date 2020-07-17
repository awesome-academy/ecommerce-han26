import axios from 'axios';
import path from 'path';

(async () => {
    const lang = document.getElementsByTagName('html')[0].lang || '';

    const preventDefaultEvent = (e) => {
        e.preventDefault();
    };

    // HIỂN THỊ MENU TRÊN THANH HEADER

    // số hàng và cột của menu
    const rowSize = 3,
        columnSize = 5;

    // tạo các menu item
    const megaMenuContainer = document.querySelector('.megamenu'),
        lastMegaMenuChild =
            megaMenuContainer.children[megaMenuContainer.children.length - 1],
        categoryContainer = document.createElement('ul'),
        categoryLevel1 = document.createElement('li'),
        categoryLevel2 = document.createElement('li'),
        categoryLevel2Name = document.createElement('a');

    categoryContainer.appendChild(categoryLevel1);
    categoryLevel2.appendChild(categoryLevel2Name);

    categoryContainer.classList.add('single-mega', 'cn-col-4');
    categoryLevel1.classList.add('title');

    // lấy dữ liệu category từ api
    const categories = await axios.get(path.resolve('api', 'categories'));

    // in ra với giới hạn là số hàng và số cột bên trên
    categories.data.slice(0, rowSize).forEach((lv1Cate) => {
        categoryLevel1.innerText = lv1Cate[lang + '_name'];

        const categoryContainerClone = categoryContainer.cloneNode(true);

        lv1Cate.categories.slice(0, columnSize).forEach((lv2Cate) => {
            categoryLevel2Name.innerText = lv2Cate[lang + '_name'];
            categoryLevel2Name.href = `/product/list?category=${lv2Cate.id}`;

            const categoryClone = categoryLevel2.cloneNode(true);

            categoryContainerClone.appendChild(categoryClone);
        });

        megaMenuContainer.insertBefore(
            categoryContainerClone,
            lastMegaMenuChild
        );
    });

    // Chỉ chạy khi đường dẫn là "/product/list"
    if (window.location.pathname === path.resolve('product', 'list')) {
        const productImageRootPath = path.resolve('img', 'product-img');

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
        favoriteButton.addEventListener('click', preventDefaultEvent);
        descriptionContainer.classList.add('product-description');
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
        const pageItemsNumber = 15,
            thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000;

        // Lấy dữ liệu của tất cả các sản phẩm từ API
        const productsResponse = await axios.get(
                path.resolve('api', 'products')
            ),
            products = productsResponse.data;

        // Đặt product price là min của các product detail
        products.forEach((product) => {
            product.price = product.product_details.length
                ? product.product_details.reduce((min, curProduct) => {
                      return curProduct.price < min ? curProduct.price : min;
                  }, Number.MAX_SAFE_INTEGER)
                : 0;

            product.is_new =
                new Date() - new Date(product.created_at) <
                thirtyDaysInMilliseconds;

            product.categories = product.categories.map(
                (category) => category.id
            );
        });

        // mảng chứa dữ liệu các sản phẩm sau khi đã sắp xếp
        let sortedProducts = [...products];

        // mảng chứa dữ liệu các sản phẩm sau khi đã lọc
        let filtedProducts = [...sortedProducts];

        const sortOptions = document.querySelector('div.nice-select > ul.list')
            .children;

        const byHighestRated = (a, b) => {
            return -1;
        };

        const byNewest = (a, b) => {
            return new Date(b['create_at']) - new Date(a['create_at']);
        };

        const highToLow = (a, b) => {
            return b.price - a.price;
        };

        const lowToHigh = (a, b) => {
            return a.price - b.price;
        };

        const sortFunctions = [byHighestRated, byNewest, highToLow, lowToHigh];

        sortedProducts.sort(byHighestRated);

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
                brandName.innerText = product.brand;
                newBadgeContainer.disabled = !product.is_new;

                productListContainer.appendChild(singleItem.cloneNode(true));
            });
            document.querySelector('.total-products > p > span').innerText =
                filtedProducts.length;

            // trái tim (rate)
            const favme = $('.favme');

            favme.on('click', function () {
                $(this).toggleClass('active');
            });

            favme.on('click touchstart', function () {
                $(this).toggleClass('is_animating');
            });

            favme.on('animationend', function () {
                $(this).toggleClass('is_animating');
            });
        };

        // Số trang nhỏ nhất và lớn nhất
        let minPageNumber = 1,
            maxPageNumber =
                Math.floor(filtedProducts.length / pageItemsNumber) + 1;

        // Số trang hiện tại và mảng các phần tử phân trang
        let currentPage = minPageNumber,
            paginationArr = [
                currentPage - 2,
                currentPage - 1,
                currentPage,
                currentPage + 1,
                currentPage + 2,
            ];

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
                        value === currentPage
                            ? 'color: #0056b3'
                            : 'color: #787878'
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

        const defaultCategory = parseInt(
            new URLSearchParams(window.location.search).get('category')
        );

        // giá trị hiện tại
        let currentMinPrice = minPrice,
            currentMaxPrice = maxPrice,
            currentColor = 'none',
            currentBrand = 'none',
            currentCategoryId = defaultCategory || 0;

        // hàm lọc sản phẩm
        const filterProducts = () => {
            filtedProducts = sortedProducts.filter((product) => {
                const colorFilter =
                    currentColor === 'none'
                        ? true
                        : product.product_details.length &&
                          product.product_details.reduce(
                              (haveColor, detail) => {
                                  return (
                                      haveColor || detail.color === currentColor
                                  );
                              },
                              false
                          );

                const priceFilter =
                    product.price >= currentMinPrice &&
                    product.price <= currentMaxPrice;

                const brandFilter =
                    currentBrand === 'none'
                        ? true
                        : product.brand === currentBrand;

                const categoryFilter =
                    currentCategoryId === 0
                        ? true
                        : product.categories.indexOf(currentCategoryId) !== -1;

                return (
                    colorFilter && priceFilter && brandFilter && categoryFilter
                );
            });
        };

        if (currentCategoryId !== 0) {
            filterProducts();
        }

        // thêm sự kiện cho các nút sắp xếp
        for (let i = 0; i < sortOptions.length; i++) {
            sortOptions[i].addEventListener('click', () => {
                sortedProducts = [...products];
                sortedProducts.sort(sortFunctions[i]);

                filterProducts();

                showProducts(minPageNumber, filtedProducts);

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
        }

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
                slide: (event, ui) => {
                    const result =
                        label_result +
                        ' ' +
                        unit +
                        ui.values[0] +
                        ' - ' +
                        unit +
                        ui.values[1];
                    t.closest('.slider-range')
                        .find('.range-price')
                        .html(result);
                    window.requestAnimationFrame(() => {
                        currentMinPrice = ui.values[0];
                        currentMaxPrice = ui.values[1];
                        filterProducts();

                        showProducts(minPageNumber, filtedProducts);
                        maxPageNumber =
                            Math.floor(
                                filtedProducts.length / pageItemsNumber
                            ) + 1;

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
            'pupple', // sai chính tả
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

        const categoriesMenu = document.getElementById('menu-content2'),
            level1CategoryContainer = document.createElement('li'),
            level1Category = document.createElement('a'),
            level2CategoryContainer = document.createElement('ul'),
            level2CategoryWrap = document.createElement('li'),
            level2Category = document.createElement('a');

        level1CategoryContainer.appendChild(level1Category);
        level1CategoryContainer.appendChild(level2CategoryContainer);
        level2CategoryWrap.appendChild(level2Category);

        level1CategoryContainer.dataset.toggle = 'collapse';
        level1Category.href = '#';
        level2CategoryContainer.classList.add('sub-menu', 'collapse');
        level2Category.href = '#';

        categories.data.forEach((lv1Cate) => {
            level1CategoryContainer.dataset.target = `#category-menu-${lv1Cate.id}`;
            level1CategoryContainer.classList.add('collapsed');
            level1Category.innerText = lv1Cate[lang + '_name'];
            level2CategoryContainer.id = `category-menu-${lv1Cate.id}`;

            const categoryContainerClone = level1CategoryContainer.cloneNode(
                true
            );

            level2Category.innerText = 'All';

            const categoryClone = level2CategoryWrap.cloneNode(true);

            categoryClone.addEventListener('click', () => {
                currentCategoryId =
                    currentCategoryId === 0 || currentCategoryId !== lv1Cate.id
                        ? lv1Cate.id
                        : 0;
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

            categoryContainerClone.children[1].appendChild(categoryClone);

            lv1Cate.categories.forEach((lv2Cate) => {
                level2Category.innerText = lv2Cate[lang + '_name'];

                const categoryClone = level2CategoryWrap.cloneNode(true);

                categoryClone.addEventListener('click', () => {
                    currentCategoryId =
                        currentCategoryId === 0 ||
                        currentCategoryId !== lv2Cate.id
                            ? lv2Cate.id
                            : 0;
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

                categoryContainerClone.children[1].appendChild(categoryClone);
            });

            categoriesMenu.appendChild(categoryContainerClone);
        });

        const productBrandContainer = document.getElementById('brand-filter'),
            productBrandWrap = document.createElement('li'),
            productBrand = document.createElement('a');

        productBrandWrap.appendChild(productBrand);

        productBrand.href = '#';

        const brandsArr = products.reduce((brands, product) => {
            if (brands.indexOf(product.brand) === -1) {
                brands.push(product.brand);
            }

            return brands;
        }, []);

        brandsArr.forEach((brand) => {
            productBrand.innerText = brand;

            const clonedNode = productBrandWrap.cloneNode(true);

            clonedNode.childNodes[0].addEventListener('click', () => {
                currentBrand =
                    currentBrand === 'none' || currentBrand !== brand
                        ? brand
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

            productBrandContainer.appendChild(clonedNode);
        });

        document
            .getElementById('reset-filter')
            .addEventListener('click', () => {
                currentMinPrice = minPrice;
                currentMaxPrice = maxPrice;
                currentColor = 'none';
                currentBrand = 'none';
                currentCategoryId = 0;

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

                priceSlider.children[1].style.left = '0%';
                priceSlider.children[2].style.left = '100%';
                priceSlider.children[3].style.left = '0%';
                priceSlider.children[3].style.width = '100%';

                document.querySelector('.range-price').innerText =
                    priceSlider.getAttribute('data-label-result') +
                    ' $' +
                    minPrice +
                    ' - ' +
                    ' $' +
                    maxPrice;
            });

        // hiển thị các sản phẩm lúc đầu (trang 1)
        showProducts(minPageNumber, filtedProducts);
        // Hiển thị pagination lúc đầu
        showPagination();
    }

    // Chỉ chạy khi đường dẫn là "/product/detail"
    if (window.location.pathname === path.resolve('product', 'detail')) {
        const productId = new URLSearchParams(window.location.search).get('id'),
            response = await axios.get(
                path.resolve('api', 'product', productId)
            ),
            product = response.data,
            options = product.product_details.reduce(
                (reducedOptions, product) => {
                    reducedOptions.sizes.indexOf(product.size) !== -1 ||
                        reducedOptions.sizes.push(product.size);

                    reducedOptions.colors.indexOf(product.color) !== -1 ||
                        reducedOptions.colors.push(product.color);

                    return reducedOptions;
                },
                {
                    sizes: [],
                    colors: [],
                }
            );

        document.getElementById('brandName').innerText = product.brand;
        document.getElementById('productName').innerText = product.name;
        document.getElementById('productDesc').innerText = product.description;

        const price = document.getElementById('productPrice'),
            selectBox = document.querySelector('.select-box'),
            sizeOptionsContainer = selectBox.children[1],
            colorOptionsContainer = selectBox.children[3],
            sizeOptions = sizeOptionsContainer.children[1],
            colorOptions = colorOptionsContainer.children[1],
            option = document.createElement('option');

        option.classList.add('option');

        let currentSize = options.sizes[0],
            currentColor = options.colors[0];

        const updatePrice = () => {
            let found = false;
            for (const detail of product.product_details) {
                if (
                    detail.size === currentSize &&
                    detail.color === currentColor
                ) {
                    price.innerText = `$${detail.price}`;
                    found = true;
                    break;
                }
            }
            if (!found) {
                switch (lang) {
                    case 'vi':
                        price.innerText = 'Loại sản phẩm này không tồn tại !!!';
                        break;
                    default:
                        price.innerText =
                            'This product type does not exist !!!';
                }
            }
        };

        updatePrice();

        options.sizes.forEach((sizeOption) => {
            switch (lang) {
                case 'vi':
                    option.innerText = `Kích cỡ: ${sizeOption}`;
                    break;
                default:
                    option.innerText = `Size: ${sizeOption}`;
            }
            option.dataset.value = sizeOption;

            const clonedOption = option.cloneNode(true);

            clonedOption.addEventListener('click', (e) => {
                currentSize = e.target.dataset.value;
                updatePrice();
            });

            sizeOptions.appendChild(clonedOption);
        });
        sizeOptionsContainer.children[0].innerText =
            sizeOptions.children[0].innerText;
        sizeOptions.children[0].classList.add('selected');

        options.colors.forEach((colorOption) => {
            switch (lang) {
                case 'vi':
                    option.innerText = `Kích cỡ: ${colorOption}`;
                    break;
                default:
                    option.innerText = `Size: ${colorOption}`;
            }
            option.dataset.value = colorOption;

            const clonedOption = option.cloneNode(true);

            clonedOption.addEventListener('click', (e) => {
                currentColor = e.target.dataset.value;
                updatePrice();
            });

            colorOptions.appendChild(clonedOption);
        });
        colorOptionsContainer.children[0].innerText =
            colorOptions.children[0].innerText;
        colorOptions.children[0].classList.add('selected');

        document.getElementById('spinner').style.display = 'none';
    }

    // :: Favorite Button Active Code
    const favme = $('.favme');

    favme.on('click', function () {
        $(this).toggleClass('active');
    });

    favme.on('click touchstart', function () {
        $(this).toggleClass('is_animating');
    });

    favme.on('animationend', function () {
        $(this).toggleClass('is_animating');
    });

    // :: Nicescroll Active Code
    if ($.fn.niceScroll) {
        $('.cart-list, .cart-content').niceScroll();
    }

    // :: PreventDefault a Click
    $("a[href='#']").on('click', function ($) {
        $.preventDefault();
    });
})();
