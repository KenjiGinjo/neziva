# @xstools/ts-rest-react-query

Fork自[@ts-rest/react-query](https://github.com/ts-rest/ts-rest/tree/main/libs/ts-rest/react-query), 内置了`@ts-rest/core`和`@tanstack/react-query`, 并且锁定了版本, 这两个包不用额外安装, 并且使用的时候直接从本包导出.

```diff
- import { useQueryClient } from '@tanstack/react-query';
+ import { useQueryClient } from '@xstools/ts-rest-react-query/tanstack-react-query';

- import { initContract } from '@ts-rest/core';
+ import { initContract } from '@xstools/ts-rest-react-query/ts-rest-core';
```
