// @Author      : WahyuBucil
// @Version     : 0.0.1
// @Date        : 2022-05-10 (10 May 2022)
// Just pass the query string `page` & `limit` to the paginator

// @Author      : WahyuBucil
// @Conributor  : Dipadana
// @Version     : 0.0.2
// @Date        : 2023-03-05 (5 March 2023)
// Refactor for universal use

// @Author      : WahyuBucil
// @Conributor  : Dipadana
// @Version     : 0.0.3
// @Date        : 2023-08-05 (5 August 2023)
// Update how to function and interface exported

// @Author      : WahyuBucil
// @Conributor  : Dipadana
// @Version     : 0.0.4
// @Date        : 2023-10-10 (10 October 2023)
// Update how to `where` import from request

// @Author      : WahyuBucil
// @Conributor  : Dipadana
// @Version     : 0.0.5
// @Date        : 2023-10-11 (11 October 2023)
// Update how to `orderBy` import from request

interface PaginateOptions<Data> {
  request: { page: number; limit: number; where: any; orderBy: any };
  count: (where: any) => Promise<number>;
  data: ({
    where,
    orderBy,
    take,
    skip,
  }: {
    where: any;
    orderBy: any;
    take: number;
    skip: number;
  }) => Promise<Data>;
}

interface MetaPaginationData<T> {
  meta: {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    firstPage: number;
  };
  data: Awaited<T>;
}

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

async function paginate<Data>(opts: PaginateOptions<Data>) {
  const query = opts.request;

  let page = query.page || 1;
  if (page < 1) page = 1;

  let limit = query.limit || DEFAULT_LIMIT;
  if (limit < 1) limit = DEFAULT_LIMIT;
  else if (limit > MAX_LIMIT) limit = MAX_LIMIT;

  const startIndex = (page - 1) * limit;

  const [totalData, data] = await Promise.all([
    opts.count(opts.request.where),
    opts.data({
      where: opts.request.where,
      orderBy: opts.request.orderBy,
      take: limit,
      skip: startIndex,
    }),
  ]);

  const totalPage = Math.ceil(totalData / limit);

  const meta = {
    total: totalData,
    perPage: limit,
    currentPage: page,
    lastPage: totalPage,
    firstPage: 1,
  };

  return { meta, data };
}

export { paginate, MetaPaginationData };
