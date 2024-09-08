# <p align="center">Skeleton</p>

<p align="center">
  <img src="https://github.com/lurickardo/skeleton/assets/34722198/2f22922f-c04a-4278-b379-e75a56ada011" alt="Logo" width="120">
</p>
<p align="center">Generic software architecture framework in <a href="https://nodejs.org" target="_blank">Node.js</a> using Fastify and Bun.</p>
<p align="center">
  <a><img src="https://img.shields.io/badge/license-MIT-green" alt="Package License" /></a>
  <a href="https://www.bun.sh" target="_blank"><img src="https://img.shields.io/badge/bun-v1.1.26-green?logo=bun" alt="Bun Version" /></a>
  <a href="https://nodejs.org" target="_blank"><img src="https://img.shields.io/badge/node-v22.8.0-green?logo=nodedotjs" alt="Node Version"></a>
  <a href="https://www.typescriptlang.org" target="_blank"><img src="https://img.shields.io/badge/typescript-v5.3.3-green?logo=typescript" alt="Typescript Version"></a>
  <a href="https://fastify.dev" target="_blank"><img src="https://img.shields.io/badge/fastify-v4.28-green?logo=fastify" alt="Fastify Version"></a>
  <a href="https://jestjs.io" target="_blank"><img src="https://img.shields.io/badge/jest-v29.7.0-green?logo=jest" alt="Jest Version"></a>
  <a href="https://biomejs.dev" target="_blank"><img src="https://img.shields.io/badge/biome-v1.8.3-green?logo=biome" alt="Biome Version"></a>
  <a href="https://zod.dev/" target="_blank"><img src="https://img.shields.io/badge/zod-v3.22.4-green?logo=zod" alt="Zod Version"></a>
</p>

## Description

Skeleton is a generic software architecture framework in Node.js using Fastify and Bun, designed to provide a flexible and reusable foundation for application development.

## Philosophy

The idea of the system is to be a base architecture for you to develop your own small or large-scale services, without the need to recreate existing solutions. At the same time, not forcing you to use a complete and heavy structure.
Each branch was created to exemplify synergistic implementations with the code base, working like "Lego pieces", where you can take only what is necessary for your version of the system and implement it in the best way possible.

# Dependencies

- Bun

# Libraries

- NodeJS
- Fastify
- Typescript
- Jest
- Biome

## Installation

```bash
$ bun install
```

## Running the app

```bash
# development
$ bun run dev

# production
$ bun run pipe
$ bun run prd
```

## Swagger

`http://localhost:3000/api/skeleton/docs`
