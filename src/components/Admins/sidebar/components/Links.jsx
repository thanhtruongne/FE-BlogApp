/* eslint-disable */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { DashIcon } from "../../icons/icon_export";
export function SidebarLinks(props) {
  // Chakra color mode
  let location = useLocation();

  const { routes } = props;
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  const createLinks = (routes) => {
    console.log(routes)
    return routes.map((route, index) => {
         if(route?.key){
            return;
         }
              
         return (
          <Link key={index} to={route?.path}>
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li
                className="my-[3px] flex cursor-pointer items-center px-8"
                key={index}
              >
                <span
                  className={`${
                    activeRoute(route.path) === true
                      ? "font-bold text-[#9f224e] dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.icon ? route.icon : <DashIcon />}{" "}
                </span>
                <p
                  className={`leading-1 ml-4 flex ${
                    activeRoute(route.path) === true
                      ? "font-bold text-navy-700 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.name}
                </p>
              </li>
              {activeRoute(route.path) ? (
                <div class="absolute right-0 top-px h-9 w-1p rounded-lg bg-[#9f224e] dark:bg-[#9f224e]" />
              ) : null}
            </div>
          </Link>
        );
      
    });
  };
  return createLinks(routes);
}

export default SidebarLinks;
