import React from 'react';

import Related01 from '../../images/related-product-01.jpg';
import Related02 from '../../images/related-product-02.jpg';
import Related03 from '../../images/related-product-03.jpg';

function CartItems() {
  return (
    <>
      <ul>
        {/* Cart item */}
        <li className="items-center py-6 border-b sm:flex border-slate-200">
          <a className="block mb-4 mr-5 sm:mb-0 md:w-32 xl:w-auto shrink-0" href="#0">
            <img className="rounded-sm" src={Related01} width="200" height="142" alt="Product 01" />
          </a>
          <div className="grow">
            <a href="#0">
              <h3 className="mb-1 text-lg font-semibold text-slate-800">The Complete Front-End Development Course!</h3>
            </a>
            <div className="mb-2 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</div>
            {/* Product meta */}
            <div className="flex flex-wrap items-center justify-between">
              {/* Rating and price */}
              <div className="flex flex-wrap items-center mr-2 space-x-2">
                {/* Rating */}
                <div className="flex items-center space-x-2">
                  {/* Stars */}
                  <div className="flex space-x-1">
                    <button>
                      <span className="sr-only">1 star</span>
                      <svg className="w-4 h-4 fill-current text-amber-500" viewBox="0 0 16 16">
                        <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                      </svg>
                    </button>
                    <button>
                      <span className="sr-only">2 stars</span>
                      <svg className="w-4 h-4 fill-current text-amber-500" viewBox="0 0 16 16">
                        <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                      </svg>
                    </button>
                    <button>
                      <span className="sr-only">3 stars</span>
                      <svg className="w-4 h-4 fill-current text-amber-500" viewBox="0 0 16 16">
                        <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                      </svg>
                    </button>
                    <button>
                      <span className="sr-only">4 stars</span>
                      <svg className="w-4 h-4 fill-current text-amber-500" viewBox="0 0 16 16">
                        <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                      </svg>
                    </button>
                    <button>
                      <span className="sr-only">5 stars</span>
                      <svg className="w-4 h-4 fill-current text-slate-300" viewBox="0 0 16 16">
                        <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                      </svg>
                    </button>
                  </div>
                  {/* Rate */}
                  <div className="inline-flex text-sm font-medium text-amber-600">4.2</div>
                </div>
                <div className="text-slate-400">·</div>
                {/* Price */}
                <div>
                  <div className="inline-flex text-sm font-medium bg-emerald-100 text-emerald-600 rounded-full text-center px-2 py-0.5">$89.00</div>
                </div>
              </div>
              <button className="text-sm underline hover:no-underline">Remove</button>
            </div>
          </div>
        </li>
        {/* Cart item */}
        <li className="items-center py-6 border-b sm:flex border-slate-200">
          <a className="block mb-4 mr-5 sm:mb-0 md:w-32 xl:w-auto shrink-0" href="#0">
            <img className="rounded-sm" src={Related02} width="200" height="142" alt="Product 02" />
          </a>
          <div className="grow">
            <a href="#0">
              <h3 className="mb-1 text-lg font-semibold text-slate-800">Web Development Ultimate Course 2021</h3>
            </a>
            <div className="mb-2 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</div>
            {/* Product meta */}
            <div className="flex flex-wrap items-center justify-between">
              {/* Rating and price */}
              <div className="flex flex-wrap items-center mr-2 space-x-2">
                {/* Rating */}
                <div className="flex items-center space-x-2">
                  {/* Stars */}
                  <div className="flex space-x-1">
                    <button>
                      <span className="sr-only">1 star</span>
                      <svg className="w-4 h-4 fill-current text-amber-500" viewBox="0 0 16 16">
                        <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                      </svg>
                    </button>
                    <button>
                      <span className="sr-only">2 stars</span>
                      <svg className="w-4 h-4 fill-current text-amber-500" viewBox="0 0 16 16">
                        <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                      </svg>
                    </button>
                    <button>
                      <span className="sr-only">3 stars</span>
                      <svg className="w-4 h-4 fill-current text-amber-500" viewBox="0 0 16 16">
                        <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                      </svg>
                    </button>
                    <button>
                      <span className="sr-only">4 stars</span>
                      <svg className="w-4 h-4 fill-current text-amber-500" viewBox="0 0 16 16">
                        <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                      </svg>
                    </button>
                    <button>
                      <span className="sr-only">5 stars</span>
                      <svg className="w-4 h-4 fill-current text-slate-300" viewBox="0 0 16 16">
                        <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                      </svg>
                    </button>
                  </div>
                  {/* Rate */}
                  <div className="inline-flex text-sm font-medium text-amber-600">4.2</div>
                </div>
                <div className="text-slate-400">·</div>
                {/* Price */}
                <div>
                  <div className="inline-flex text-sm font-medium bg-emerald-100 text-emerald-600 rounded-full text-center px-2 py-0.5">$89.00</div>
                </div>
              </div>
              <button className="text-sm underline hover:no-underline">Remove</button>
            </div>
          </div>
        </li>
        {/* Cart item */}
        <li className="items-center py-6 border-b sm:flex border-slate-200">
          <a className="block mb-4 mr-5 sm:mb-0 md:w-32 xl:w-auto shrink-0" href="#0">
            <img className="rounded-sm" src={Related03} width="200" height="142" alt="Product 03" />
          </a>
          <div className="grow">
            <a href="#0">
              <h3 className="mb-1 text-lg font-semibold text-slate-800">Full-Stack JavaScript Course!</h3>
            </a>
            <div className="mb-2 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</div>
            {/* Product meta */}
            <div className="flex flex-wrap items-center justify-between">
              {/* Rating and price */}
              <div className="flex flex-wrap items-center mr-2 space-x-2">
                {/* Rating */}
                <div className="flex items-center space-x-2">
                  {/* Stars */}
                  <div className="flex space-x-1">
                    <button>
                      <span className="sr-only">1 star</span>
                      <svg className="w-4 h-4 fill-current text-amber-500" viewBox="0 0 16 16">
                        <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                      </svg>
                    </button>
                    <button>
                      <span className="sr-only">2 stars</span>
                      <svg className="w-4 h-4 fill-current text-amber-500" viewBox="0 0 16 16">
                        <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                      </svg>
                    </button>
                    <button>
                      <span className="sr-only">3 stars</span>
                      <svg className="w-4 h-4 fill-current text-amber-500" viewBox="0 0 16 16">
                        <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                      </svg>
                    </button>
                    <button>
                      <span className="sr-only">4 stars</span>
                      <svg className="w-4 h-4 fill-current text-amber-500" viewBox="0 0 16 16">
                        <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                      </svg>
                    </button>
                    <button>
                      <span className="sr-only">5 stars</span>
                      <svg className="w-4 h-4 fill-current text-slate-300" viewBox="0 0 16 16">
                        <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                      </svg>
                    </button>
                  </div>
                  {/* Rate */}
                  <div className="inline-flex text-sm font-medium text-amber-600">4.2</div>
                </div>
                <div className="text-slate-400">·</div>
                {/* Price */}
                <div>
                  <div className="inline-flex text-sm font-medium bg-emerald-100 text-emerald-600 rounded-full text-center px-2 py-0.5">$89.00</div>
                </div>
              </div>
              <button className="text-sm underline hover:no-underline">Remove</button>
            </div>
          </div>
        </li>
      </ul>

      <div className="mt-6">
        <a className="text-sm font-medium text-indigo-500 hover:text-indigo-600" href="#0">&lt;- Back To Shopping</a>
      </div>
    </>
  );
}

export default CartItems;