# PnP Modern Search - Like component

## Summary

Custom web component for the PnP Modern Search (v4) solution.
This component adds a like button on search results displayed by the Search Results Web Part.

![DemoImage](/assets/Like-results.png)

![DemoGif](/assets/Like-results.gif)


## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.18.2-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [PnP Modern Search (v4)](https://microsoft-search.github.io/pnp-modern-search/)

## Prerequisites

PnP Modern Search (v4) solution must be installed in your tenant.

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| pnp-modern-search-like-component | a1mery |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | November 08, 2024 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run the follwing to build the component:
  - **npm install**
  - **gulp bundle --ship**
  - **gulp package-solution --ship**

- Deploy the component in your tenant ()
- Register the component with your Search Results Web Part: [Register your extensibility library with a Web Part](https://microsoft-search.github.io/pnp-modern-search/extensibility/#register-your-extensibility-library-with-a-web-part)

## Features

This component adds a like button on search results displayed by the Search Results Web Part.
For the first version, only pages are supported.

This extension illustrates the following concepts:

- Use of a custom web component to extend the PnP Modern search (v4) solution 
- Use PnPjs to like/unlike content


## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
- [PnP Modern Search (v4) - Extensibility possibilities](https://microsoft-search.github.io/pnp-modern-search/extensibility/)
- [PnP/PnPjs](https://pnp.github.io/pnpjs/)
