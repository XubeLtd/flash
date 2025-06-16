import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

export const XubeSubscribeToUserAccountsRequest = z.object({
  headers: z.record(z.string()).optional(),
  subscriptionPath: z.string(),
  nextToken: z.string().optional(),
  limit: z.number().optional(),
  destination: z.string(),
  user: z.string().email(),
  descending: z.boolean().optional().default(false),
});
export type TXubeSubscribeToUserAccountsRequest = z.infer<
  typeof XubeSubscribeToUserAccountsRequest
>;
export const XubeBoolean = z.boolean();
export type TXubeBoolean = z.infer<typeof XubeBoolean>;
export const XubeDeleteSubscriptionResponse = z.boolean();
export type TXubeDeleteSubscriptionResponse = z.infer<
  typeof XubeDeleteSubscriptionResponse
>;
export const XubeSubscribeToAccountRequest = z.object({
  headers: z.record(z.string()).optional(),
  subscriptionPath: z.string(),
  destination: z.string(),
  account: z.string(),
});
export type TXubeSubscribeToAccountRequest = z.infer<
  typeof XubeSubscribeToAccountRequest
>;
export const XubeAccount = z.object({
  creator: z.string(),
  created: z.string().datetime({ offset: true }),
  name: z.string().regex(/^[a-zA-Z0-9-_ ]+$/),
  id: z.string().min(3),
  avatar: z.string().optional(),
  type: z.string().min(3).optional(),
  email: z.string().optional(),
});
export type TXubeAccount = z.infer<typeof XubeAccount>;
export const XubeGetAccountRequest = z.object({ account: z.string() });
export type TXubeGetAccountRequest = z.infer<typeof XubeGetAccountRequest>;
export const XubeGetAccountResponse = z.object({
  creator: z.string(),
  created: z.string().datetime({ offset: true }),
  name: z.string().regex(/^[a-zA-Z0-9-_ ]+$/),
  id: z.string().min(3),
  avatar: z.string().optional(),
  type: z.string().min(3).optional(),
  email: z.string().optional(),
});
export type TXubeGetAccountResponse = z.infer<typeof XubeGetAccountResponse>;
export const XubeGetAccountUserRequest = z.object({
  user: z.string(),
  account: z.string(),
});
export type TXubeGetAccountUserRequest = z.infer<
  typeof XubeGetAccountUserRequest
>;
export const XubeAccountUser = z.object({
  creator: z.string().optional(),
  created: z.string().datetime({ offset: true }),
  v: z.string(),
  roles: z.array(z.string()),
  name: z.string().optional(),
  id: z.string().min(3),
  type: z.string().min(3).optional(),
  user: z.string().optional(),
  account: z.string().regex(/^[a-zA-Z0-9-_ ]+$/),
  email: z.string(),
});
export type TXubeAccountUser = z.infer<typeof XubeAccountUser>;
export const XubeRemoveUserFromAccountRequest = z.object({
  user: z.string(),
  account: z.string(),
});
export type TXubeRemoveUserFromAccountRequest = z.infer<
  typeof XubeRemoveUserFromAccountRequest
>;
export const XubeGetUserAccountsRequest = z.object({
  nextToken: z.string().optional(),
  limit: z.number().optional(),
  user: z.string().email(),
  descending: z.boolean().optional().default(false),
});
export type TXubeGetUserAccountsRequest = z.infer<
  typeof XubeGetUserAccountsRequest
>;
export const XubeGetUserAccountsResponse = z
  .object({
    data: z.array(
      z.object({
        creator: z.string().optional(),
        created: z.string().datetime({ offset: true }),
        v: z.string(),
        roles: z.array(z.string()),
        name: z.string().optional(),
        id: z.string().min(3),
        type: z.string().min(3).optional(),
        user: z.string().optional(),
        account: z.string().regex(/^[a-zA-Z0-9-_ ]+$/),
        email: z.string(),
      })
    ),
    nextToken: z.string().optional(),
  })
  .passthrough();
export type TXubeGetUserAccountsResponse = z.infer<
  typeof XubeGetUserAccountsResponse
>;
export const XubeGetAccountAvatarUploadUrlRequest = z.object({
  imageType: z.enum(["jpeg", "svg", "png", "gif"]),
  account: z.string(),
});
export type TXubeGetAccountAvatarUploadUrlRequest = z.infer<
  typeof XubeGetAccountAvatarUploadUrlRequest
>;
export const XubeGetAccountAvatarUploadUrlResponse = z.object({
  url: z.string(),
});
export type TXubeGetAccountAvatarUploadUrlResponse = z.infer<
  typeof XubeGetAccountAvatarUploadUrlResponse
>;
export const XubeGetAccountApiKeysRequest = z.object({ account: z.string() });
export type TXubeGetAccountApiKeysRequest = z.infer<
  typeof XubeGetAccountApiKeysRequest
>;
export const XubeApiKeys = z.object({
  data: z.array(
    z.object({
      lastUsed: z.string().datetime({ offset: true }).optional(),
      creator: z.string(),
      expires: z.string().datetime({ offset: true }).optional(),
      apiKey: z.string(),
      created: z.string().datetime({ offset: true }),
      name: z.string().optional(),
      description: z.string().optional(),
      id: z.string(),
      account: z.string(),
    })
  ),
  nextToken: z.string().optional(),
});
export type TXubeApiKeys = z.infer<typeof XubeApiKeys>;
export const XubeCreateApiKeyRequest = z.object({
  expires: z.string().datetime({ offset: true }).optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  account: z.string(),
});
export type TXubeCreateApiKeyRequest = z.infer<typeof XubeCreateApiKeyRequest>;
export const XubeCreateApiKeyResponse = z.object({
  apiKey: z.string(),
  id: z.string(),
});
export type TXubeCreateApiKeyResponse = z.infer<
  typeof XubeCreateApiKeyResponse
>;
export const XubeCreateAccountRequest = z.object({
  name: z.string().regex(/^[a-zA-Z0-9-_ ]+$/),
  email: z.string().email(),
});
export type TXubeCreateAccountRequest = z.infer<
  typeof XubeCreateAccountRequest
>;
export const XubeCreateAccountResponse = z.object({ id: z.string() });
export type TXubeCreateAccountResponse = z.infer<
  typeof XubeCreateAccountResponse
>;
export const XubeGetAccountApiKeyRequest = z.object({
  account: z.string(),
  key: z.string(),
});
export type TXubeGetAccountApiKeyRequest = z.infer<
  typeof XubeGetAccountApiKeyRequest
>;
export const XubeGetAccountApiKeyResponse = z.object({
  lastUsed: z.string().datetime({ offset: true }).optional(),
  creator: z.string(),
  expires: z.string().datetime({ offset: true }).optional(),
  apiKey: z.string(),
  created: z.string().datetime({ offset: true }),
  name: z.string().optional(),
  description: z.string().optional(),
  id: z.string(),
  account: z.string(),
});
export type TXubeGetAccountApiKeyResponse = z.infer<
  typeof XubeGetAccountApiKeyResponse
>;
export const XubeRemoveApiKeyRequest = z.object({
  account: z.string(),
  key: z.string(),
});
export type TXubeRemoveApiKeyRequest = z.infer<typeof XubeRemoveApiKeyRequest>;
export const XubeRemoveApiKeyResponse = z.boolean();
export type TXubeRemoveApiKeyResponse = z.infer<
  typeof XubeRemoveApiKeyResponse
>;
export const XubeUpdateApiKeyRequest = z.object({
  expires: z.string().datetime({ offset: true }).optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  account: z.string(),
  key: z.string(),
});
export type TXubeUpdateApiKeyRequest = z.infer<typeof XubeUpdateApiKeyRequest>;
export const XubeUpdateApiKeyResponse = z.object({
  creator: z.string(),
  expires: z.string().datetime({ offset: true }).optional(),
  encryptedApiKey: z.string(),
  created: z.string().datetime({ offset: true }),
  SK_GSI1: z.string(),
  description: z.string().optional(),
  lastUsed: z.string().datetime({ offset: true }).optional(),
  lastUsedService: z.string().optional(),
  PK_GSI1: z.string(),
  searchHash: z.string(),
  name: z.string().optional(),
  SK: z.string(),
  id: z.string().min(3),
  PK: z.string(),
  account: z.string(),
});
export type TXubeUpdateApiKeyResponse = z.infer<
  typeof XubeUpdateApiKeyResponse
>;
export const XubeCheckAccountUserPermissionsRequest = z.object({
  user: z.string(),
  actions: z.array(
    z.object({
      service: z.string(),
      action: z.string(),
      permissionTypes: z
        .array(z.enum(["ADMIN", "CREATE", "READ", "UPDATE", "DELETE"]))
        .optional(),
    })
  ),
  account: z.string(),
});
export type TXubeCheckAccountUserPermissionsRequest = z.infer<
  typeof XubeCheckAccountUserPermissionsRequest
>;
export const XubeAccountUserPermissions = z.array(
  z.object({
    creator: z.string().optional(),
    service: z.string(),
    created: z.string().datetime({ offset: true }).optional(),
    effect: z.enum(["Allow", "Deny"]),
    name: z.string().optional(),
    action: z.string(),
    id: z.string().min(3),
    type: z.string().min(3).optional(),
    user: z.string(),
    ttl: z.number().optional(),
    account: z.string(),
  })
);
export type TXubeAccountUserPermissions = z.infer<
  typeof XubeAccountUserPermissions
>;
export const XubeSetAccountUserPermissionsRequest = z.object({
  expiry: z.string().datetime({ offset: true }).optional(),
  user: z.string(),
  actions: z.array(
    z.object({
      service: z.string(),
      effect: z.enum(["Allow", "Deny"]),
      action: z.string(),
    })
  ),
  account: z.string(),
});
export type TXubeSetAccountUserPermissionsRequest = z.infer<
  typeof XubeSetAccountUserPermissionsRequest
>;
export const XubeSetAccountUserPermissionsResponse = z.boolean();
export type TXubeSetAccountUserPermissionsResponse = z.infer<
  typeof XubeSetAccountUserPermissionsResponse
>;
export const XubeAccountUsers = z.object({
  data: z.array(
    z.object({
      creator: z.string().optional(),
      created: z.string().datetime({ offset: true }),
      v: z.string(),
      roles: z.array(z.string()),
      name: z.string().optional(),
      id: z.string().min(3),
      type: z.string().min(3).optional(),
      user: z.string().optional(),
      account: z.string().regex(/^[a-zA-Z0-9-_ ]+$/),
      email: z.string(),
    })
  ),
  nextToken: z.string().optional(),
});
export type TXubeAccountUsers = z.infer<typeof XubeAccountUsers>;
export const XubeGetTokenFromApiKeyRequest = z.object({ apiKey: z.string() });
export type TXubeGetTokenFromApiKeyRequest = z.infer<
  typeof XubeGetTokenFromApiKeyRequest
>;
export const XubeGetTokenFromApiKeyResponse = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  email: z.string().email(),
});
export type TXubeGetTokenFromApiKeyResponse = z.infer<
  typeof XubeGetTokenFromApiKeyResponse
>;
export const XubeAddUserToAccountRequest = z.object({
  roles: z.array(z.string()),
  user: z.string(),
  account: z.string(),
});
export type TXubeAddUserToAccountRequest = z.infer<
  typeof XubeAddUserToAccountRequest
>;
export const XubeSubscribeToChildrenRequest = z.object({
  componentType: z.string().optional(),
  headers: z.record(z.string()).optional(),
  component: z.string(),
  subscriptionPath: z.string(),
  nextToken: z.string().optional(),
  limit: z.number().optional(),
  destination: z.string(),
  descending: z.boolean().optional().default(false),
});
export type TXubeSubscribeToChildrenRequest = z.infer<
  typeof XubeSubscribeToChildrenRequest
>;
export const XubeDeleteSubscriptionRequest = z.object({
  SK: z.string(),
  destination: z.string(),
  PK: z.string(),
  email: z.string(),
});
export type TXubeDeleteSubscriptionRequest = z.infer<
  typeof XubeDeleteSubscriptionRequest
>;
export const XubeSubscribeToParentsRequest = z.array(
  z
    .object({
      parent: z.string(),
      creator: z.string().optional(),
      created: z.string().datetime({ offset: true }).optional(),
      name: z.string().optional(),
      id: z.string().min(3),
      type: z.string().min(3).optional(),
      child: z.string(),
    })
    .passthrough()
);
export type TXubeSubscribeToParentsRequest = z.infer<
  typeof XubeSubscribeToParentsRequest
>;
export const XubeGetParentsRequest = z.object({
  componentType: z.string().optional(),
  component: z.string(),
});
export type TXubeGetParentsRequest = z.infer<typeof XubeGetParentsRequest>;
export const XubeGetParentsResponse = z.object({
  data: z.array(
    z
      .object({
        parent: z.string(),
        creator: z.string().optional(),
        created: z.string().datetime({ offset: true }).optional(),
        name: z.string().optional(),
        id: z.string().min(3),
        type: z.string().min(3).optional(),
        child: z.string(),
      })
      .passthrough()
  ),
});
export type TXubeGetParentsResponse = z.infer<typeof XubeGetParentsResponse>;
export const XubeGetAccountComponentsRequest = z.object({
  componentType: z.string().optional(),
  nextToken: z.string().optional(),
  limit: z.number().optional(),
  descending: z.boolean().optional().default(false),
  account: z.string(),
});
export type TXubeGetAccountComponentsRequest = z.infer<
  typeof XubeGetAccountComponentsRequest
>;
export const XubeGetAccountComponentsResponse = z.object({
  data: z.array(
    z.object({
      accountId: z.string().regex(/^[a-zA-Z0-9-_ ]+$/),
      componentId: z.string().optional(),
      SK: z.string(),
      PK: z.string(),
      id: z.string().min(3),
    })
  ),
  nextToken: z.string().optional(),
});
export type TXubeGetAccountComponentsResponse = z.infer<
  typeof XubeGetAccountComponentsResponse
>;
export const XubeGetChildrenRequest = z.object({
  componentType: z.string().optional(),
  component: z.string(),
  nextToken: z.string().optional(),
  limit: z.number().optional(),
  descending: z.boolean().optional().default(false),
});
export type TXubeGetChildrenRequest = z.infer<typeof XubeGetChildrenRequest>;
export const XubeGetChildrenResponse = z.object({
  data: z.array(
    z.object({
      parent: z.string(),
      creator: z.string().optional(),
      created: z.string().datetime({ offset: true }).optional(),
      SK: z.string(),
      name: z.string().optional(),
      PK: z.string(),
      id: z.string().min(3),
      type: z.string().min(3).optional(),
      child: z.string(),
    })
  ),
  nextToken: z.string().optional(),
});
export type TXubeGetChildrenResponse = z.infer<typeof XubeGetChildrenResponse>;
export const XubeAddChildrenRequest = z.object({
  component: z.string(),
  children: z.array(z.string()),
});
export type TXubeAddChildrenRequest = z.infer<typeof XubeAddChildrenRequest>;
export const XubeSuccess = z.object({ success: z.boolean() });
export type TXubeSuccess = z.infer<typeof XubeSuccess>;
export const XubeRemoveChildrenRequest = z.object({
  component: z.string(),
  children: z.array(z.string()),
});
export type TXubeRemoveChildrenRequest = z.infer<
  typeof XubeRemoveChildrenRequest
>;
export const XubeSubscribeToAccountComponentsRequest = z.object({
  componentType: z.string().optional(),
  headers: z.record(z.string()).optional(),
  subscriptionPath: z.string(),
  nextToken: z.string().optional(),
  limit: z.number().optional(),
  destination: z.string(),
  descending: z.boolean().optional().default(false),
  account: z.string(),
});
export type TXubeSubscribeToAccountComponentsRequest = z.infer<
  typeof XubeSubscribeToAccountComponentsRequest
>;
export const XubeCreateComponentRequest = z.object({
  name: z.string().optional(),
  id: z.string().min(3).optional(),
  type: z.string(),
  account: z.string().regex(/^[a-zA-Z0-9-_ ]+$/),
});
export type TXubeCreateComponentRequest = z.infer<
  typeof XubeCreateComponentRequest
>;
export const XubeId = z.object({ id: z.string().min(3) });
export type TXubeId = z.infer<typeof XubeId>;
export const XubeGetComponentRequest = z.object({ component: z.string() });
export type TXubeGetComponentRequest = z.infer<typeof XubeGetComponentRequest>;
export const XubeComponent = z.object({
  componentType: z.string(),
  creator: z.string().optional(),
  created: z.string().datetime({ offset: true }).optional(),
  name: z.string().optional(),
  id: z.string().min(3),
  type: z.string().min(3).optional(),
});
export type TXubeComponent = z.infer<typeof XubeComponent>;
export const XubeGetFavouriteDashboardsRequest = z.object({
  user: z.string(),
  account: z.string(),
});
export type TXubeGetFavouriteDashboardsRequest = z.infer<
  typeof XubeGetFavouriteDashboardsRequest
>;
export const XubeGetFavouriteDashboardsResponse = z.object({
  data: z.array(
    z.object({
      accountId: z.string(),
      creator: z.string().optional(),
      componentId: z.string(),
      created: z.string().datetime({ offset: true }).optional(),
      name: z.string().optional(),
      id: z.string().min(3),
      type: z.string().min(3).optional(),
      userId: z.string(),
    })
  ),
  nextToken: z.string().optional(),
});
export type TXubeGetFavouriteDashboardsResponse = z.infer<
  typeof XubeGetFavouriteDashboardsResponse
>;
export const XubeSetDashboardsAsFavouriteRequest = z.object({
  user: z.string(),
  dashboards: z.array(z.string()),
  account: z.string(),
});
export type TXubeSetDashboardsAsFavouriteRequest = z.infer<
  typeof XubeSetDashboardsAsFavouriteRequest
>;
export const XubeGetDashboardRequest = z.object({ dashboard: z.string() });
export type TXubeGetDashboardRequest = z.infer<typeof XubeGetDashboardRequest>;
export const XubeDashboard = z.object({
  componentType: z.literal("DASHBOARD"),
  creator: z.string().optional(),
  components: z
    .array(
      z
        .object({
          context: z.record(z.object({}).partial().passthrough()).optional(),
          id: z.string(),
          type: z.enum(["device", "group", "graph", "map", "cardSummaries"]),
        })
        .passthrough()
    )
    .optional(),
  created: z.string().datetime({ offset: true }).optional(),
  name: z.string(),
  description: z.string().optional(),
  id: z.string().min(3),
  type: z.string().min(3).optional(),
  updated: z.string().datetime({ offset: true }).optional(),
  updater: z.string().optional(),
});
export type TXubeDashboard = z.infer<typeof XubeDashboard>;
export const XubeUpdateDashboardRequest = z.object({
  components: z
    .array(
      z
        .object({
          context: z.record(z.object({}).partial().passthrough()).optional(),
          id: z.string(),
          type: z.enum(["device", "group", "graph", "map", "cardSummaries"]),
        })
        .passthrough()
    )
    .optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  dashboard: z.string(),
});
export type TXubeUpdateDashboardRequest = z.infer<
  typeof XubeUpdateDashboardRequest
>;
export const XubeGetAccountDashboardsRequest = z.object({
  account: z.string(),
});
export type TXubeGetAccountDashboardsRequest = z.infer<
  typeof XubeGetAccountDashboardsRequest
>;
export const XubeGetAccountDashboardsResponse = z.object({
  data: z.array(
    z.object({
      accountId: z.string().regex(/^[a-zA-Z0-9-_ ]+$/),
      componentId: z.string(),
      SK: z.string(),
      PK: z.string(),
      id: z.string().min(3),
    })
  ),
  nextToken: z.string().optional(),
});
export type TXubeGetAccountDashboardsResponse = z.infer<
  typeof XubeGetAccountDashboardsResponse
>;
export const XubeCreateDashboardRequest = z.object({
  components: z
    .array(
      z
        .object({
          context: z.record(z.object({}).partial().passthrough()).optional(),
          id: z.string(),
          type: z.enum(["device", "group", "graph", "map", "cardSummaries"]),
        })
        .passthrough()
    )
    .optional(),
  name: z.string(),
  description: z.string().optional(),
  id: z.string().min(3).optional(),
  account: z.string().regex(/^[a-zA-Z0-9-_ ]+$/),
});
export type TXubeCreateDashboardRequest = z.infer<
  typeof XubeCreateDashboardRequest
>;
export const XubeCreateDashboardResponse = z.object({ id: z.string().min(3) });
export type TXubeCreateDashboardResponse = z.infer<
  typeof XubeCreateDashboardResponse
>;
export const XubeConfirmDestinationRequest = z.object({
  confirmationToken: z.string(),
  arn: z.string(),
  account: z.string(),
});
export type TXubeConfirmDestinationRequest = z.infer<
  typeof XubeConfirmDestinationRequest
>;
export const XubeConfirmDestinationResponse = z.boolean();
export type TXubeConfirmDestinationResponse = z.infer<
  typeof XubeConfirmDestinationResponse
>;
export const XubeSubscribeToCurrentDataDestinationRequest = z.object({
  headers: z.record(z.string()).optional(),
  subscriptionPath: z.string(),
  destination: z.string(),
  account: z.string(),
});
export type TXubeSubscribeToCurrentDataDestinationRequest = z.infer<
  typeof XubeSubscribeToCurrentDataDestinationRequest
>;
export const XubeBooleanModel = z.boolean();
export type TXubeBooleanModel = z.infer<typeof XubeBooleanModel>;
export const XubeResendDataDestinationConfirmationRequest = z.object({
  account: z.string(),
});
export type TXubeResendDataDestinationConfirmationRequest = z.infer<
  typeof XubeResendDataDestinationConfirmationRequest
>;
export const XubeResendDataDestinationConfirmationResponse = z.object({
  destination: z.string(),
});
export type TXubeResendDataDestinationConfirmationResponse = z.infer<
  typeof XubeResendDataDestinationConfirmationResponse
>;
export const XubeSubscribeToDataRequest = z.object({
  headers: z.record(z.string()).optional(),
  destination: z.string(),
  account: z.string(),
});
export type TXubeSubscribeToDataRequest = z.infer<
  typeof XubeSubscribeToDataRequest
>;
export const XubeSubscribeToDataResponse = z.boolean();
export type TXubeSubscribeToDataResponse = z.infer<
  typeof XubeSubscribeToDataResponse
>;
export const XubeGetCurrentDataDestinationRequest = z.object({
  account: z.string(),
});
export type TXubeGetCurrentDataDestinationRequest = z.infer<
  typeof XubeGetCurrentDataDestinationRequest
>;
export const XubeDataDestination = z.object({
  headers: z.record(z.string()),
  creator: z.string().optional(),
  created: z.string().datetime({ offset: true }),
  destination: z.string(),
  name: z.string().optional(),
  id: z.string().min(3),
  type: z.string().min(3).optional(),
  account: z.string().regex(/^[a-zA-Z0-9-_ ]+$/),
  status: z.enum([
    "disabled",
    "pending",
    "awaitingConfirmation",
    "confirmed",
    "healthy",
    "inaccessible",
    "unauthorized",
  ]),
});
export type TXubeDataDestination = z.infer<typeof XubeDataDestination>;
export const XubeDeviceRequest = z.object({ device: z.string() });
export type TXubeDeviceRequest = z.infer<typeof XubeDeviceRequest>;
export const XubeDevice = z.object({
  generation: z.string(),
  creator: z.string().optional(),
  modelId: z.string().optional(),
  created: z.string().datetime({ offset: true }).optional(),
  certificate: z.object({ certificateArn: z.string() }).partial().optional(),
  name: z.string().optional(),
  model: z.string(),
  id: z.string().min(3),
  type: z.string().min(3).optional(),
  make: z.string(),
});
export type TXubeDevice = z.infer<typeof XubeDevice>;
export const XubeUpdateDeviceRequest = z.object({
  name: z.string().optional(),
  device: z.string(),
});
export type TXubeUpdateDeviceRequest = z.infer<typeof XubeUpdateDeviceRequest>;
export const XubeStringModel = z.string();
export type TXubeStringModel = z.infer<typeof XubeStringModel>;
export const XubeSubscribeToDevice = z.object({
  headers: z.record(z.string()).optional(),
  subscriptionPath: z.string(),
  destination: z.string(),
  device: z.string(),
});
export type TXubeSubscribeToDevice = z.infer<typeof XubeSubscribeToDevice>;
export const XubeDeviceUpdate = z.object({
  creator: z.string().optional(),
  created: z.string().datetime({ offset: true }).optional(),
  approval: z.object({
    created: z.string().datetime({ offset: true }),
    state: z.enum(["approved", "denied", "pending"]),
    conditions: z.array(z.enum(["local", "remote"])).optional(),
    updated: z.string().datetime({ offset: true }).optional(),
    updater: z.string().optional(),
  }),
  type: z.string().min(3).optional(),
  updater: z.string().optional(),
  mismatch: z
    .record(z.object({ actual: z.string(), expected: z.string() }))
    .optional(),
  name: z.string().optional(),
  progress: z.record(
    z
      .object({
        totalSize: z.number(),
        lastOffset: z.number(),
        updated: z.string(),
      })
      .partial()
  ),
  id: z.string().min(3),
  state: z.enum([
    "waiting_for_device_status",
    "ready_to_send",
    "sent",
    "failed",
    "in_progress",
    "completed",
  ]),
  job: z.string().optional(),
  conditions: z.array(z.enum(["local", "remote"])).optional(),
  updated: z.string().datetime({ offset: true }).optional(),
  device: z.string(),
  tasks: z.array(
    z.object({
      a: z.enum([
        "d",
        "u",
        "upd",
        "r",
        "cdr",
        "z",
        "a",
        "s",
        "b",
        "e",
        "k",
        "x",
        "crash",
        "t",
      ]),
      tries: z.number().optional(),
      topics: z.record(z.string()).optional(),
      ctx: z.record(z.object({}).partial().passthrough()).optional(),
      timeout: z.number().optional(),
    })
  ),
});
export type TXubeDeviceUpdate = z.infer<typeof XubeDeviceUpdate>;
export const XubeDeleteSubscriptionRequest1 = z.boolean();
export type TXubeDeleteSubscriptionRequest1 = z.infer<
  typeof XubeDeleteSubscriptionRequest1
>;
export const XubeSubscribeToAccountDevicesRequest = z.object({
  headers: z.record(z.string()).optional(),
  subscriptionPath: z.string(),
  destination: z.string(),
  account: z.string(),
});
export type TXubeSubscribeToAccountDevicesRequest = z.infer<
  typeof XubeSubscribeToAccountDevicesRequest
>;
export const XubeJobResponse = z.object({ job: z.string() });
export type TXubeJobResponse = z.infer<typeof XubeJobResponse>;
export const XubeSetUpdateApprovalRequest = z.object({
  approval: z.enum(["approved", "denied", "pending"]),
  conditions: z.array(z.enum(["local", "remote"])).optional(),
  device: z.string(),
});
export type TXubeSetUpdateApprovalRequest = z.infer<
  typeof XubeSetUpdateApprovalRequest
>;
export const XubeDeviceStatus = z.object({
  connectivity: z
    .object({
      wifi: z.object({
        signalStrength: z
          .object({
            state: z.enum([
              "disabled",
              "pending",
              "unknown",
              "error",
              "warning",
              "healthy",
            ]),
            message: z.string().optional(),
            updated: z.string(),
            value: z.number().optional(),
          })
          .optional(),
        connection: z.object({
          state: z.enum([
            "disabled",
            "pending",
            "unknown",
            "error",
            "warning",
            "healthy",
          ]),
          message: z.string().optional(),
          updated: z.string(),
          value: z.enum(["connected", "notConnected", "notInUse", "pending"]),
        }),
        ssid: z.string().optional(),
      }),
      cellular: z.object({
        signalStrength: z
          .object({
            state: z.enum([
              "disabled",
              "pending",
              "unknown",
              "error",
              "warning",
              "healthy",
            ]),
            message: z.string().optional(),
            updated: z.string(),
            value: z.number().optional(),
          })
          .optional(),
        connection: z.object({
          state: z.enum([
            "disabled",
            "pending",
            "unknown",
            "error",
            "warning",
            "healthy",
          ]),
          message: z.string().optional(),
          updated: z.string(),
          value: z.enum(["connected", "notConnected", "notInUse", "pending"]),
        }),
      }),
      eth: z.object({
        connection: z.object({
          state: z.enum([
            "disabled",
            "pending",
            "unknown",
            "error",
            "warning",
            "healthy",
          ]),
          message: z.string().optional(),
          updated: z.string(),
          value: z.enum(["connected", "notConnected", "notInUse", "pending"]),
        }),
        mac: z.string().optional(),
      }),
      platform: z.object({
        connection: z.object({
          state: z.enum([
            "disabled",
            "pending",
            "unknown",
            "error",
            "warning",
            "healthy",
          ]),
          message: z.string().optional(),
          updated: z.string(),
          value: z.enum(["connected", "notConnected", "notInUse", "pending"]),
        }),
      }),
    })
    .partial(),
  engine: z
    .object({
      state: z.enum(["running", "stopped", "error", "unknown"]),
      updated: z.string(),
    })
    .optional(),
  temperature: z
    .object({
      state: z.enum([
        "disabled",
        "pending",
        "unknown",
        "error",
        "warning",
        "healthy",
      ]),
      message: z.string().optional(),
      updated: z.string(),
      value: z.number(),
    })
    .optional(),
  availability: z
    .object({
      state: z.enum(["online", "offline", "unknown"]),
      updated: z.string(),
    })
    .optional(),
  power: z.object({
    auxiliary: z
      .object({
        connection: z.object({
          state: z.enum([
            "disabled",
            "pending",
            "unknown",
            "error",
            "warning",
            "healthy",
          ]),
          message: z.string().optional(),
          updated: z.string(),
          value: z.enum(["connected", "notConnected", "notInUse", "pending"]),
        }),
        voltage: z
          .object({
            state: z.enum([
              "disabled",
              "pending",
              "unknown",
              "error",
              "warning",
              "healthy",
            ]),
            message: z.string().optional(),
            updated: z.string(),
            value: z.number().optional(),
          })
          .optional(),
      })
      .optional(),
    usb: z
      .object({
        connection: z.object({
          state: z.enum([
            "disabled",
            "pending",
            "unknown",
            "error",
            "warning",
            "healthy",
          ]),
          message: z.string().optional(),
          updated: z.string(),
          value: z.enum(["connected", "notConnected", "notInUse", "pending"]),
        }),
        voltage: z
          .object({
            state: z.enum([
              "disabled",
              "pending",
              "unknown",
              "error",
              "warning",
              "healthy",
            ]),
            message: z.string().optional(),
            updated: z.string(),
            value: z.number().optional(),
          })
          .optional(),
      })
      .optional(),
    solar: z
      .object({
        connection: z.object({
          state: z.enum([
            "disabled",
            "pending",
            "unknown",
            "error",
            "warning",
            "healthy",
          ]),
          message: z.string().optional(),
          updated: z.string(),
          value: z.enum(["connected", "notConnected", "notInUse", "pending"]),
        }),
        voltage: z
          .object({
            state: z.enum([
              "disabled",
              "pending",
              "unknown",
              "error",
              "warning",
              "healthy",
            ]),
            message: z.string().optional(),
            updated: z.string(),
            value: z.number().optional(),
          })
          .optional(),
      })
      .optional(),
    source: z.object({
      currentSource: z.object({
        state: z.enum([
          "disabled",
          "pending",
          "unknown",
          "error",
          "warning",
          "healthy",
        ]),
        message: z.string().optional(),
        updated: z.string(),
        value: z.enum([
          "battery",
          "usb",
          "solar",
          "auxiliary",
          "noSource",
          "unknownSource",
        ]),
      }),
    }),
    battery: z
      .object({
        charge: z.object({
          state: z.enum([
            "disabled",
            "pending",
            "unknown",
            "error",
            "warning",
            "healthy",
          ]),
          message: z.string().optional(),
          updated: z.string(),
          value: z.number(),
        }),
        temperature: z
          .object({
            state: z.enum([
              "disabled",
              "pending",
              "unknown",
              "error",
              "warning",
              "healthy",
            ]),
            message: z.string().optional(),
            updated: z.string(),
            value: z.number(),
          })
          .optional(),
        chargingState: z.enum(["charging", "notCharging", "unknown"]),
      })
      .optional(),
  }),
  timestamp: z.string(),
});
export type TXubeDeviceStatus = z.infer<typeof XubeDeviceStatus>;
export const XubeGetLatestDeviceVersionRequest = z.object({
  device: z.string(),
});
export type TXubeGetLatestDeviceVersionRequest = z.infer<
  typeof XubeGetLatestDeviceVersionRequest
>;
export const XubeFirmwareRequest = z.union([
  z.object({
    device: z.string(),
    version: z.union([z.literal("current"), z.literal("expected")]),
  }),
  z.object({ version: z.string() }),
  z.object({}).partial(),
]);
export type TXubeFirmwareRequest = z.infer<typeof XubeFirmwareRequest>;
export const XubeFirmwares = z.array(
  z.object({
    creator: z.string().optional(),
    created: z.string().datetime({ offset: true }).optional(),
    forceUpdate: z.boolean().optional(),
    type: z.string().min(3).optional(),
    version: z.string(),
    versionDescriptions: z.record(z.array(z.string())).optional(),
    partition: z.string().optional(),
    size: z.number().optional(),
    checksum: z.number().optional(),
    name: z.string().optional(),
    id: z.string().min(3),
    compatibility: z.array(
      z.object({
        bootloader: z
          .object({ min: z.string(), max: z.string().optional() })
          .optional(),
        firmware: z
          .object({ min: z.string(), max: z.string().optional() })
          .optional(),
        hardware: z.object({
          generation: z
            .object({ min: z.string(), max: z.string().optional() })
            .optional(),
          model: z.string(),
          make: z.string(),
        }),
      })
    ),
    key: z.string(),
  })
);
export type TXubeFirmwares = z.infer<typeof XubeFirmwares>;
export const XubeSetFirmwareVersionsRequest = z.object({
  devices: z.array(z.string()),
  firmwareVersion: z.string(),
});
export type TXubeSetFirmwareVersionsRequest = z.infer<
  typeof XubeSetFirmwareVersionsRequest
>;
export const XubeGetDeviceLocationRequest = z.object({ device: z.string() });
export type TXubeGetDeviceLocationRequest = z.infer<
  typeof XubeGetDeviceLocationRequest
>;
export const XubeDeviceLocation = z.object({
  creator: z.string().optional(),
  created: z.string().datetime({ offset: true }).optional(),
  latitude: z.number(),
  name: z.string().optional(),
  id: z.string().min(3),
  type: z.string().min(3).optional(),
  deviceId: z.string(),
  updated: z.string().datetime({ offset: true }).optional(),
  longitude: z.number(),
  updater: z.string().optional(),
});
export type TXubeDeviceLocation = z.infer<typeof XubeDeviceLocation>;
export const XubeSetDeviceLocationRequest = z.object({
  latitude: z.number().gte(-90).lte(90),
  device: z.string(),
  longitude: z.number().gte(-180).lte(180),
});
export type TXubeSetDeviceLocationRequest = z.infer<
  typeof XubeSetDeviceLocationRequest
>;
export const XubeSuccessModel = z.object({ success: z.boolean() });
export type TXubeSuccessModel = z.infer<typeof XubeSuccessModel>;
export const XubeClearDeviceLocationRequest = z.object({ device: z.string() });
export type TXubeClearDeviceLocationRequest = z.infer<
  typeof XubeClearDeviceLocationRequest
>;
export const XubeGetDeviceVersionsRequest = z.object({ device: z.string() });
export type TXubeGetDeviceVersionsRequest = z.infer<
  typeof XubeGetDeviceVersionsRequest
>;
export const XubeGetDeviceVersionsResponse = z.object({
  versions: z.array(z.number()),
});
export type TXubeGetDeviceVersionsResponse = z.infer<
  typeof XubeGetDeviceVersionsResponse
>;
export const XubeGetDevicesRequestModelName = z.object({
  devices: z.array(z.string()),
});
export type TXubeGetDevicesRequestModelName = z.infer<
  typeof XubeGetDevicesRequestModelName
>;
export const XubeDeviceModel = z.object({
  generation: z.string(),
  creator: z.string().optional(),
  created: z.string().datetime({ offset: true }),
  name: z.string(),
  model: z.string(),
  id: z.string().min(3),
  type: z.string().min(3).optional(),
  updates: z
    .object({
      config: z
        .object({ conditions: z.array(z.enum(["local", "remote"])) })
        .partial(),
      firmware: z
        .object({ conditions: z.array(z.enum(["local", "remote"])) })
        .partial(),
    })
    .partial()
    .optional(),
  make: z.string(),
  config: z
    .object({
      schema: z.record(z.object({}).partial().passthrough()),
      properties: z.array(
        z.object({
          readable: z.boolean().optional(),
          format: z.enum(["WIFI_CREDENTIALS", "GENERAL"]).optional(),
          label: z.string(),
          value: z.string().optional(),
          validation: z.record(z.object({}).partial().passthrough()).optional(),
          writable: z.boolean().optional(),
        })
      ),
    })
    .partial()
    .optional(),
});
export type TXubeDeviceModel = z.infer<typeof XubeDeviceModel>;
export const XubeSetFirmwareVersionRequest = z.object({
  firmwareVersion: z.string(),
  device: z.string(),
});
export type TXubeSetFirmwareVersionRequest = z.infer<
  typeof XubeSetFirmwareVersionRequest
>;
export const XubeResetConnectedDevicesRequest = z.object({
  duration: z.number().gte(0).lte(10000).optional(),
  device: z.string(),
  targets: z.array(z.enum(["others", "all"])).min(1),
});
export type TXubeResetConnectedDevicesRequest = z.infer<
  typeof XubeResetConnectedDevicesRequest
>;
export const XubeDevicesModelName = z.array(
  z
    .object({
      generation: z.string(),
      creator: z.string().optional(),
      modelId: z.string().optional(),
      created: z.string().datetime({ offset: true }).optional(),
      certificate: z
        .object({ certificateArn: z.string() })
        .partial()
        .optional(),
      name: z.string().optional(),
      model: z.string(),
      id: z.string().min(3),
      type: z.string().min(3).optional(),
      make: z.string(),
    })
    .passthrough()
);
export type TXubeDevicesModelName = z.infer<typeof XubeDevicesModelName>;
export const XubeSetDeviceUpdateRequest = z.object({
  mismatch: z
    .record(
      z.object({
        actual: z.object({ cv: z.number(), v: z.number() }),
        expected: z.object({ cv: z.number(), v: z.number() }),
      })
    )
    .optional(),
  progress: z
    .record(
      z
        .object({
          totalSize: z.number(),
          lastOffset: z.number(),
          updated: z.string(),
        })
        .partial()
    )
    .optional(),
  state: z
    .enum([
      "waiting_for_device_status",
      "ready_to_send",
      "sent",
      "failed",
      "in_progress",
      "completed",
    ])
    .optional(),
  device: z.string(),
});
export type TXubeSetDeviceUpdateRequest = z.infer<
  typeof XubeSetDeviceUpdateRequest
>;
export const XubeVersionResponse = z.object({ version: z.string() });
export type TXubeVersionResponse = z.infer<typeof XubeVersionResponse>;
export const XubeGetDeviceFilesUploadUrlRequest = z.object({
  device: z.string(),
});
export type TXubeGetDeviceFilesUploadUrlRequest = z.infer<
  typeof XubeGetDeviceFilesUploadUrlRequest
>;
export const XubeSubscribeToDevicesStatusRequest = z.object({
  headers: z.record(z.string()).optional(),
  subscriptionPath: z.string(),
  devices: z.array(z.string()),
  destination: z.string(),
});
export type TXubeSubscribeToDevicesStatusRequest = z.infer<
  typeof XubeSubscribeToDevicesStatusRequest
>;
export const XubeGetDeviceLatestActivationStatusRequest = z.object({
  device: z.string(),
  account: z.string(),
});
export type TXubeGetDeviceLatestActivationStatusRequest = z.infer<
  typeof XubeGetDeviceLatestActivationStatusRequest
>;
export const XubeDeviceActivationStatus = z.object({
  accountId: z.string(),
  creator: z.string().optional(),
  created: z.string().datetime({ offset: true }).optional(),
  name: z.string().optional(),
  activationStatus: z.enum(["active", "inactive"]),
  id: z.string().min(3),
  type: z.string().min(3).optional(),
  deviceId: z.string(),
  updated: z.string().datetime({ offset: true }).optional(),
  timestamp: z.string(),
  updater: z.string().optional(),
});
export type TXubeDeviceActivationStatus = z.infer<
  typeof XubeDeviceActivationStatus
>;
export const XubeSetDeviceActivationStatusRequest = z.object({
  activationStatus: z.enum(["active", "inactive"]),
  device: z.string(),
  account: z.string(),
});
export type TXubeSetDeviceActivationStatusRequest = z.infer<
  typeof XubeSetDeviceActivationStatusRequest
>;
export const XubeGetDeviceFilesResponse = z
  .object({
    current: z.object({
      scripting: z
        .record(
          z.object({
            path: z.string(),
            existing: z
              .array(
                z.object({
                  partition: z.string().optional(),
                  size: z.number().optional(),
                  checksum: z.number().optional(),
                  version: z.string(),
                  key: z.string(),
                })
              )
              .optional(),
            acceptance: z
              .object({
                accepted: z.boolean(),
                timestamp: z.string().optional(),
              })
              .optional(),
            active: z.object({
              partition: z.string().optional(),
              size: z.number().optional(),
              checksum: z.number().optional(),
              version: z.string(),
              key: z.string(),
            }),
          })
        )
        .optional(),
      environment: z.object({
        release: z.string(),
        mqttEndpoint: z.string(),
        region: z.string(),
        status: z
          .enum([
            "disabled",
            "pending",
            "unknown",
            "error",
            "warning",
            "healthy",
          ])
          .optional(),
      }),
      system: z.object({
        firmware: z.object({
          path: z.string(),
          existing: z
            .array(
              z.object({
                partition: z.string().optional(),
                size: z.number().optional(),
                checksum: z.number().optional(),
                version: z.string(),
                key: z.string(),
              })
            )
            .optional(),
          acceptance: z
            .object({ accepted: z.boolean(), timestamp: z.string().optional() })
            .optional(),
          active: z.object({
            partition: z.string().optional(),
            size: z.number().optional(),
            checksum: z.number().optional(),
            version: z.string(),
            key: z.string(),
          }),
        }),
      }),
      stage: z.enum(["current", "expected", "historical"]),
      orphaned: z
        .record(
          z.object({
            path: z.string(),
            existing: z
              .array(
                z.object({
                  partition: z.string().optional(),
                  size: z.number().optional(),
                  checksum: z.number().optional(),
                  version: z.string(),
                  key: z.string(),
                })
              )
              .optional(),
            acceptance: z
              .object({
                accepted: z.boolean(),
                timestamp: z.string().optional(),
              })
              .optional(),
            active: z.object({
              partition: z.string().optional(),
              size: z.number().optional(),
              checksum: z.number().optional(),
              version: z.string(),
              key: z.string(),
            }),
          })
        )
        .optional(),
      storage: z
        .record(
          z.object({
            path: z.string(),
            existing: z
              .array(
                z.object({
                  partition: z.string().optional(),
                  size: z.number().optional(),
                  checksum: z.number().optional(),
                  version: z.string(),
                  key: z.string(),
                })
              )
              .optional(),
            acceptance: z
              .object({
                accepted: z.boolean(),
                timestamp: z.string().optional(),
              })
              .optional(),
            active: z.object({
              partition: z.string().optional(),
              size: z.number().optional(),
              checksum: z.number().optional(),
              version: z.string(),
              key: z.string(),
            }),
          })
        )
        .optional(),
      communication: z
        .record(
          z.object({
            path: z.string(),
            existing: z
              .array(
                z.object({
                  partition: z.string().optional(),
                  size: z.number().optional(),
                  checksum: z.number().optional(),
                  version: z.string(),
                  key: z.string(),
                })
              )
              .optional(),
            acceptance: z
              .object({
                accepted: z.boolean(),
                timestamp: z.string().optional(),
              })
              .optional(),
            active: z.object({
              partition: z.string().optional(),
              size: z.number().optional(),
              checksum: z.number().optional(),
              version: z.string(),
              key: z.string(),
            }),
          })
        )
        .optional(),
      device: z.string(),
      config: z
        .record(
          z.object({
            path: z.string(),
            existing: z
              .array(
                z.object({
                  partition: z.string().optional(),
                  size: z.number().optional(),
                  checksum: z.number().optional(),
                  version: z.string(),
                  key: z.string(),
                })
              )
              .optional(),
            acceptance: z
              .object({
                accepted: z.boolean(),
                timestamp: z.string().optional(),
              })
              .optional(),
            active: z.object({
              partition: z.string().optional(),
              size: z.number().optional(),
              checksum: z.number().optional(),
              version: z.string(),
              key: z.string(),
            }),
          })
        )
        .optional(),
      updated: z.string().datetime({ offset: true }).optional(),
      status: z.enum([
        "disabled",
        "pending",
        "unknown",
        "error",
        "warning",
        "healthy",
      ]),
    }),
    expected: z.object({
      scripting: z
        .record(
          z.object({
            path: z.string(),
            existing: z
              .array(
                z.object({
                  partition: z.string().optional(),
                  size: z.number().optional(),
                  checksum: z.number().optional(),
                  version: z.string(),
                  key: z.string(),
                })
              )
              .optional(),
            acceptance: z
              .object({
                accepted: z.boolean(),
                timestamp: z.string().optional(),
              })
              .optional(),
            active: z.object({
              partition: z.string().optional(),
              size: z.number().optional(),
              checksum: z.number().optional(),
              version: z.string(),
              key: z.string(),
            }),
          })
        )
        .optional(),
      environment: z.object({
        release: z.string(),
        mqttEndpoint: z.string(),
        region: z.string(),
        status: z
          .enum([
            "disabled",
            "pending",
            "unknown",
            "error",
            "warning",
            "healthy",
          ])
          .optional(),
      }),
      system: z.object({
        firmware: z.object({
          path: z.string(),
          existing: z
            .array(
              z.object({
                partition: z.string().optional(),
                size: z.number().optional(),
                checksum: z.number().optional(),
                version: z.string(),
                key: z.string(),
              })
            )
            .optional(),
          acceptance: z
            .object({ accepted: z.boolean(), timestamp: z.string().optional() })
            .optional(),
          active: z.object({
            partition: z.string().optional(),
            size: z.number().optional(),
            checksum: z.number().optional(),
            version: z.string(),
            key: z.string(),
          }),
        }),
      }),
      stage: z.enum(["current", "expected", "historical"]),
      orphaned: z
        .record(
          z.object({
            path: z.string(),
            existing: z
              .array(
                z.object({
                  partition: z.string().optional(),
                  size: z.number().optional(),
                  checksum: z.number().optional(),
                  version: z.string(),
                  key: z.string(),
                })
              )
              .optional(),
            acceptance: z
              .object({
                accepted: z.boolean(),
                timestamp: z.string().optional(),
              })
              .optional(),
            active: z.object({
              partition: z.string().optional(),
              size: z.number().optional(),
              checksum: z.number().optional(),
              version: z.string(),
              key: z.string(),
            }),
          })
        )
        .optional(),
      storage: z
        .record(
          z.object({
            path: z.string(),
            existing: z
              .array(
                z.object({
                  partition: z.string().optional(),
                  size: z.number().optional(),
                  checksum: z.number().optional(),
                  version: z.string(),
                  key: z.string(),
                })
              )
              .optional(),
            acceptance: z
              .object({
                accepted: z.boolean(),
                timestamp: z.string().optional(),
              })
              .optional(),
            active: z.object({
              partition: z.string().optional(),
              size: z.number().optional(),
              checksum: z.number().optional(),
              version: z.string(),
              key: z.string(),
            }),
          })
        )
        .optional(),
      communication: z
        .record(
          z.object({
            path: z.string(),
            existing: z
              .array(
                z.object({
                  partition: z.string().optional(),
                  size: z.number().optional(),
                  checksum: z.number().optional(),
                  version: z.string(),
                  key: z.string(),
                })
              )
              .optional(),
            acceptance: z
              .object({
                accepted: z.boolean(),
                timestamp: z.string().optional(),
              })
              .optional(),
            active: z.object({
              partition: z.string().optional(),
              size: z.number().optional(),
              checksum: z.number().optional(),
              version: z.string(),
              key: z.string(),
            }),
          })
        )
        .optional(),
      device: z.string(),
      config: z
        .record(
          z.object({
            path: z.string(),
            existing: z
              .array(
                z.object({
                  partition: z.string().optional(),
                  size: z.number().optional(),
                  checksum: z.number().optional(),
                  version: z.string(),
                  key: z.string(),
                })
              )
              .optional(),
            acceptance: z
              .object({
                accepted: z.boolean(),
                timestamp: z.string().optional(),
              })
              .optional(),
            active: z.object({
              partition: z.string().optional(),
              size: z.number().optional(),
              checksum: z.number().optional(),
              version: z.string(),
              key: z.string(),
            }),
          })
        )
        .optional(),
      updated: z.string().datetime({ offset: true }).optional(),
      status: z.enum([
        "disabled",
        "pending",
        "unknown",
        "error",
        "warning",
        "healthy",
      ]),
    }),
  })
  .partial();
export type TXubeGetDeviceFilesResponse = z.infer<
  typeof XubeGetDeviceFilesResponse
>;
export const XubeGetDeviceModelsRequest = z.object({}).partial();
export type TXubeGetDeviceModelsRequest = z.infer<
  typeof XubeGetDeviceModelsRequest
>;
export const XubeGetDeviceModelsResponse = z.array(
  z.object({
    generation: z.string(),
    creator: z.string().optional(),
    created: z.string().datetime({ offset: true }),
    name: z.string(),
    model: z.string(),
    id: z.string().min(3),
    type: z.string().min(3).optional(),
    updates: z
      .object({
        config: z
          .object({ conditions: z.array(z.enum(["local", "remote"])) })
          .partial(),
        firmware: z
          .object({ conditions: z.array(z.enum(["local", "remote"])) })
          .partial(),
      })
      .partial()
      .optional(),
    make: z.string(),
    config: z
      .object({
        schema: z.record(z.object({}).partial().passthrough()),
        properties: z.array(
          z.object({
            readable: z.boolean().optional(),
            format: z.enum(["WIFI_CREDENTIALS", "GENERAL"]).optional(),
            label: z.string(),
            value: z.string().optional(),
            validation: z
              .record(z.object({}).partial().passthrough())
              .optional(),
            writable: z.boolean().optional(),
          })
        ),
      })
      .partial()
      .optional(),
  })
);
export type TXubeGetDeviceModelsResponse = z.infer<
  typeof XubeGetDeviceModelsResponse
>;
export const XubeSubscribeToDevicesRequestModelName = z.object({
  headers: z.record(z.string()).optional(),
  subscriptionPath: z.string(),
  devices: z.array(z.string()),
  destination: z.string(),
});
export type TXubeSubscribeToDevicesRequestModelName = z.infer<
  typeof XubeSubscribeToDevicesRequestModelName
>;
export const XubeGetDevicesHeartbeatsRequest = z.object({
  devices: z.array(z.string()),
});
export type TXubeGetDevicesHeartbeatsRequest = z.infer<
  typeof XubeGetDevicesHeartbeatsRequest
>;
export const XubeGetDevicesHeartbeatsResponse = z.object({
  data: z.array(
    z.object({
      device: z.string(),
      timestamp: z.string().datetime({ offset: true }),
    })
  ),
  nextToken: z.string().optional(),
});
export type TXubeGetDevicesHeartbeatsResponse = z.infer<
  typeof XubeGetDevicesHeartbeatsResponse
>;
export const XubeAccountDevicesRequest = z.object({
  nextToken: z.string().optional(),
  limit: z.number().optional(),
  account: z.string(),
  descending: z.boolean().optional().default(false),
});
export type TXubeAccountDevicesRequest = z.infer<
  typeof XubeAccountDevicesRequest
>;
export const XubeAccountDevices = z.object({
  data: z.array(
    z.object({
      accountId: z.string(),
      creator: z.string().optional(),
      created: z.string().datetime({ offset: true }).optional(),
      name: z.string().optional(),
      id: z.string().min(3),
      type: z.string().min(3).optional(),
      deviceId: z.string(),
    })
  ),
  nextToken: z.string().optional(),
});
export type TXubeAccountDevices = z.infer<typeof XubeAccountDevices>;
export const XubeGetDeviceVersionDownloadUrlRequest = z.object({
  device: z.string(),
  version: z.string(),
});
export type TXubeGetDeviceVersionDownloadUrlRequest = z.infer<
  typeof XubeGetDeviceVersionDownloadUrlRequest
>;
export const XubeDeviceAccount = z.object({
  accountId: z.string(),
  creator: z.string().optional(),
  created: z.string().datetime({ offset: true }).optional(),
  name: z.string().optional(),
  id: z.string().min(3),
  type: z.string().min(3).optional(),
  deviceId: z.string(),
});
export type TXubeDeviceAccount = z.infer<typeof XubeDeviceAccount>;
export const XubeCopyDeviceConfigRequest = z.object({
  sourceDeviceId: z.string(),
  targetDeviceIds: z.array(z.string()),
});
export type TXubeCopyDeviceConfigRequest = z.infer<
  typeof XubeCopyDeviceConfigRequest
>;
export const XubeGetDevicesStatusRequestModelName = z.object({
  devices: z.array(z.string()),
});
export type TXubeGetDevicesStatusRequestModelName = z.infer<
  typeof XubeGetDevicesStatusRequestModelName
>;
export const XubeDevicesStatusModelName = z.record(
  z.object({
    connectivity: z
      .object({
        wifi: z.object({
          signalStrength: z
            .object({
              state: z.enum([
                "disabled",
                "pending",
                "unknown",
                "error",
                "warning",
                "healthy",
              ]),
              message: z.string().optional(),
              updated: z.string(),
              value: z.number().optional(),
            })
            .optional(),
          connection: z.object({
            state: z.enum([
              "disabled",
              "pending",
              "unknown",
              "error",
              "warning",
              "healthy",
            ]),
            message: z.string().optional(),
            updated: z.string(),
            value: z.enum(["connected", "notConnected", "notInUse", "pending"]),
          }),
          ssid: z.string().optional(),
        }),
        cellular: z.object({
          signalStrength: z
            .object({
              state: z.enum([
                "disabled",
                "pending",
                "unknown",
                "error",
                "warning",
                "healthy",
              ]),
              message: z.string().optional(),
              updated: z.string(),
              value: z.number().optional(),
            })
            .optional(),
          connection: z.object({
            state: z.enum([
              "disabled",
              "pending",
              "unknown",
              "error",
              "warning",
              "healthy",
            ]),
            message: z.string().optional(),
            updated: z.string(),
            value: z.enum(["connected", "notConnected", "notInUse", "pending"]),
          }),
        }),
        eth: z.object({
          connection: z.object({
            state: z.enum([
              "disabled",
              "pending",
              "unknown",
              "error",
              "warning",
              "healthy",
            ]),
            message: z.string().optional(),
            updated: z.string(),
            value: z.enum(["connected", "notConnected", "notInUse", "pending"]),
          }),
          mac: z.string().optional(),
        }),
        platform: z.object({
          connection: z.object({
            state: z.enum([
              "disabled",
              "pending",
              "unknown",
              "error",
              "warning",
              "healthy",
            ]),
            message: z.string().optional(),
            updated: z.string(),
            value: z.enum(["connected", "notConnected", "notInUse", "pending"]),
          }),
        }),
      })
      .partial(),
    engine: z
      .object({
        state: z.enum(["running", "stopped", "error", "unknown"]),
        updated: z.string(),
      })
      .optional(),
    temperature: z
      .object({
        state: z.enum([
          "disabled",
          "pending",
          "unknown",
          "error",
          "warning",
          "healthy",
        ]),
        message: z.string().optional(),
        updated: z.string(),
        value: z.number(),
      })
      .optional(),
    availability: z
      .object({
        state: z.enum(["online", "offline", "unknown"]),
        updated: z.string(),
      })
      .optional(),
    power: z.object({
      auxiliary: z
        .object({
          connection: z.object({
            state: z.enum([
              "disabled",
              "pending",
              "unknown",
              "error",
              "warning",
              "healthy",
            ]),
            message: z.string().optional(),
            updated: z.string(),
            value: z.enum(["connected", "notConnected", "notInUse", "pending"]),
          }),
          voltage: z
            .object({
              state: z.enum([
                "disabled",
                "pending",
                "unknown",
                "error",
                "warning",
                "healthy",
              ]),
              message: z.string().optional(),
              updated: z.string(),
              value: z.number().optional(),
            })
            .optional(),
        })
        .optional(),
      usb: z
        .object({
          connection: z.object({
            state: z.enum([
              "disabled",
              "pending",
              "unknown",
              "error",
              "warning",
              "healthy",
            ]),
            message: z.string().optional(),
            updated: z.string(),
            value: z.enum(["connected", "notConnected", "notInUse", "pending"]),
          }),
          voltage: z
            .object({
              state: z.enum([
                "disabled",
                "pending",
                "unknown",
                "error",
                "warning",
                "healthy",
              ]),
              message: z.string().optional(),
              updated: z.string(),
              value: z.number().optional(),
            })
            .optional(),
        })
        .optional(),
      solar: z
        .object({
          connection: z.object({
            state: z.enum([
              "disabled",
              "pending",
              "unknown",
              "error",
              "warning",
              "healthy",
            ]),
            message: z.string().optional(),
            updated: z.string(),
            value: z.enum(["connected", "notConnected", "notInUse", "pending"]),
          }),
          voltage: z
            .object({
              state: z.enum([
                "disabled",
                "pending",
                "unknown",
                "error",
                "warning",
                "healthy",
              ]),
              message: z.string().optional(),
              updated: z.string(),
              value: z.number().optional(),
            })
            .optional(),
        })
        .optional(),
      source: z.object({
        currentSource: z.object({
          state: z.enum([
            "disabled",
            "pending",
            "unknown",
            "error",
            "warning",
            "healthy",
          ]),
          message: z.string().optional(),
          updated: z.string(),
          value: z.enum([
            "battery",
            "usb",
            "solar",
            "auxiliary",
            "noSource",
            "unknownSource",
          ]),
        }),
      }),
      battery: z
        .object({
          charge: z.object({
            state: z.enum([
              "disabled",
              "pending",
              "unknown",
              "error",
              "warning",
              "healthy",
            ]),
            message: z.string().optional(),
            updated: z.string(),
            value: z.number(),
          }),
          temperature: z
            .object({
              state: z.enum([
                "disabled",
                "pending",
                "unknown",
                "error",
                "warning",
                "healthy",
              ]),
              message: z.string().optional(),
              updated: z.string(),
              value: z.number(),
            })
            .optional(),
          chargingState: z.enum(["charging", "notCharging", "unknown"]),
        })
        .optional(),
    }),
    timestamp: z.string(),
  })
);
export type TXubeDevicesStatusModelName = z.infer<
  typeof XubeDevicesStatusModelName
>;
export const XubeGetDeviceHeartbeatsRequest = z.object({
  nextToken: z.string().optional(),
  limit: z.number().optional(),
  start: z.string().datetime({ offset: true }).optional(),
  end: z.string().datetime({ offset: true }).optional(),
  device: z.string(),
  descending: z.boolean().optional().default(false),
});
export type TXubeGetDeviceHeartbeatsRequest = z.infer<
  typeof XubeGetDeviceHeartbeatsRequest
>;
export const XubeGetDeviceHeartbeatsResponse = z.object({
  data: z.array(
    z.object({
      device: z.string(),
      timestamp: z.string().datetime({ offset: true }),
    })
  ),
  nextToken: z.string().optional(),
});
export type TXubeGetDeviceHeartbeatsResponse = z.infer<
  typeof XubeGetDeviceHeartbeatsResponse
>;
export const GetProvisioningDocsrequest = z.object({}).partial().passthrough();
export type TGetProvisioningDocsrequest = z.infer<
  typeof GetProvisioningDocsrequest
>;
export const GetProvisioningDocsresponse = z.string();
export type TGetProvisioningDocsresponse = z.infer<
  typeof GetProvisioningDocsresponse
>;
export const GetApiDocsrequest = z.object({}).partial().passthrough();
export type TGetApiDocsrequest = z.infer<typeof GetApiDocsrequest>;
export const GetApiDocsresponse = z.string();
export type TGetApiDocsresponse = z.infer<typeof GetApiDocsresponse>;
export const XubeGetGroupChildrenRequest = z.object({ group: z.string() });
export type TXubeGetGroupChildrenRequest = z.infer<
  typeof XubeGetGroupChildrenRequest
>;
export const XubeGetGroupChildrenResponse = z.object({
  data: z.array(
    z.object({
      parent: z.string(),
      creator: z.string().optional(),
      created: z.string().datetime({ offset: true }).optional(),
      SK: z.string(),
      name: z.string().optional(),
      PK: z.string(),
      id: z.string().min(3),
      type: z.string().min(3).optional(),
      child: z.string(),
    })
  ),
  nextToken: z.string().optional(),
});
export type TXubeGetGroupChildrenResponse = z.infer<
  typeof XubeGetGroupChildrenResponse
>;
export const XubeAddChildrenToGroupRequest = z.object({
  children: z.array(z.string()),
  group: z.string(),
});
export type TXubeAddChildrenToGroupRequest = z.infer<
  typeof XubeAddChildrenToGroupRequest
>;
export const XubeAddChildrenToGroupResponse = z.object({
  success: z.boolean(),
});
export type TXubeAddChildrenToGroupResponse = z.infer<
  typeof XubeAddChildrenToGroupResponse
>;
export const XubeRemoveChildrenFromGroupRequest = z.object({
  children: z.array(z.string()),
  group: z.string(),
});
export type TXubeRemoveChildrenFromGroupRequest = z.infer<
  typeof XubeRemoveChildrenFromGroupRequest
>;
export const XubeRemoveChildrenFromGroupResponse = z.object({
  success: z.boolean(),
});
export type TXubeRemoveChildrenFromGroupResponse = z.infer<
  typeof XubeRemoveChildrenFromGroupResponse
>;
export const XubeGetGroupRequest = z.object({ group: z.string() });
export type TXubeGetGroupRequest = z.infer<typeof XubeGetGroupRequest>;
export const XubeGroup = z.object({
  componentType: z.string(),
  creator: z.string().optional(),
  created: z.string().datetime({ offset: true }).optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  id: z.string().min(3),
  type: z.string().min(3).optional(),
});
export type TXubeGroup = z.infer<typeof XubeGroup>;
export const XubeUpdateGroupRequest = z.object({
  name: z.string().optional(),
  group: z.string(),
});
export type TXubeUpdateGroupRequest = z.infer<typeof XubeUpdateGroupRequest>;
export const XubeUpdateGroupResponse = z.object({ id: z.string().min(3) });
export type TXubeUpdateGroupResponse = z.infer<typeof XubeUpdateGroupResponse>;
export const XubeGetAccountGroupsRequest = z.object({
  componentType: z.string().optional(),
  nextToken: z.string().optional(),
  limit: z.number().optional(),
  descending: z.boolean().optional().default(false),
  account: z.string(),
});
export type TXubeGetAccountGroupsRequest = z.infer<
  typeof XubeGetAccountGroupsRequest
>;
export const XubeGetAccountGroupsResponse = z.object({
  data: z.array(
    z.object({
      accountId: z.string().regex(/^[a-zA-Z0-9-_ ]+$/),
      creator: z.string().optional(),
      componentId: z.string(),
      created: z.string().datetime({ offset: true }).optional(),
      name: z.string().optional(),
      SK: z.string(),
      id: z.string().min(3),
      PK: z.string(),
      type: z.string().min(3).optional(),
    })
  ),
  nextToken: z.string().optional(),
});
export type TXubeGetAccountGroupsResponse = z.infer<
  typeof XubeGetAccountGroupsResponse
>;
export const XubeCreateGroupRequest = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  id: z.string().min(3).optional(),
  account: z.string().regex(/^[a-zA-Z0-9-_ ]+$/),
});
export type TXubeCreateGroupRequest = z.infer<typeof XubeCreateGroupRequest>;
export const XubeCreateGroupResponse = z.object({ id: z.string().min(3) });
export type TXubeCreateGroupResponse = z.infer<typeof XubeCreateGroupResponse>;
export const XubeCreateSystemDesignRequest = z.object({
  name: z.string(),
  description: z.string().optional(),
  account: z.string(),
});
export type TXubeCreateSystemDesignRequest = z.infer<
  typeof XubeCreateSystemDesignRequest
>;
export const XubeCreateSystemDesignResponse = z.object({
  id: z.string().min(3),
});
export type TXubeCreateSystemDesignResponse = z.infer<
  typeof XubeCreateSystemDesignResponse
>;
export const XubeGetSystemDesignsRequest = z.object({
  nextToken: z.string().optional(),
  limit: z.number().optional(),
  account: z.string(),
  descending: z.boolean().optional().default(false),
});
export type TXubeGetSystemDesignsRequest = z.infer<
  typeof XubeGetSystemDesignsRequest
>;
export const XubeGetSystemDesignsResponse = z.object({
  data: z.array(
    z.object({
      accountId: z.string(),
      creator: z.string().optional(),
      descriptionSchema: z.string().optional(),
      data: z.record(z.object({}).partial().passthrough()),
      created: z.string().datetime({ offset: true }).optional(),
      name: z.string().optional(),
      id: z.string().min(3),
      type: z.string().min(3).optional(),
      updated: z.string().datetime({ offset: true }).optional(),
      updater: z.string().optional(),
    })
  ),
  nextToken: z.string().optional(),
});
export type TXubeGetSystemDesignsResponse = z.infer<
  typeof XubeGetSystemDesignsResponse
>;
export const XubeGetTransactionCountRequest = z.object({
  from: z.string(),
  to: z.string(),
  account: z.string(),
});
export type TXubeGetTransactionCountRequest = z.infer<
  typeof XubeGetTransactionCountRequest
>;
export const XubeGetTransactionCountResponse = z.array(
  z.object({
    projected: z
      .object({
        dataTransferCount: z.number(),
        from: z.string(),
        to: z.string(),
      })
      .optional(),
    current: z.object({
      dataTransferCount: z.number(),
      from: z.string(),
      to: z.string(),
    }),
  })
);
export type TXubeGetTransactionCountResponse = z.infer<
  typeof XubeGetTransactionCountResponse
>;
export const XubeSignUpRequest = z.object({
  password: z.string(),
  email: z.string(),
});
export type TXubeSignUpRequest = z.infer<typeof XubeSignUpRequest>;
export const XubeSignUpResponse = z.object({ id: z.string().min(3) });
export type TXubeSignUpResponse = z.infer<typeof XubeSignUpResponse>;
export const XubeRefreshRequest = z.object({ refreshToken: z.string() });
export type TXubeRefreshRequest = z.infer<typeof XubeRefreshRequest>;
export const XubeRefreshResponse = z.object({ token: z.string() });
export type TXubeRefreshResponse = z.infer<typeof XubeRefreshResponse>;
export const XubeLogInRequest = z.object({
  password: z.string(),
  email: z.string(),
});
export type TXubeLogInRequest = z.infer<typeof XubeLogInRequest>;
export const XubeLogInResponse = z.object({
  token: z.string(),
  refreshToken: z.string(),
});
export type TXubeLogInResponse = z.infer<typeof XubeLogInResponse>;
export const XubeGetUserRequest = z.object({ user: z.string().email() });
export type TXubeGetUserRequest = z.infer<typeof XubeGetUserRequest>;
export const XubeUser = z
  .object({
    deleted: z.string().datetime({ offset: true }).optional(),
    v: z.string(),
    created: z.string().datetime({ offset: true }),
    name: z.string(),
    id: z.string().min(3),
    email: z.string().email(),
  })
  .passthrough();
export type TXubeUser = z.infer<typeof XubeUser>;

export const endpoints = makeApi([
  {
    method: "post",
    path: "/accounts/",
    alias: "Create Account",
    description: `Create a new account. Actions: Account:CreateAccount`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeCreateAccountRequest,
      },
    ],
    response: z.object({ id: z.string() }),
  },
  {
    method: "get",
    path: "/accounts/:account",
    alias: "Get Account",
    description: `Get Account Details. Actions: Account:GetAccount`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ account: z.string() }),
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeGetAccountResponse,
  },
  {
    method: "post",
    path: "/accounts/:account/avatar",
    alias: "Get Account Avatar Upload URL",
    description: `Get a pre-signed URL for uploading an account avatar. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetAccountAvatarUploadUrlRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ url: z.string() }),
  },
  {
    method: "get",
    path: "/accounts/:account/keys",
    alias: "Get Account API Keys",
    description: `Get all API keys for an account. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ account: z.string() }),
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeApiKeys,
  },
  {
    method: "post",
    path: "/accounts/:account/keys",
    alias: "Create Api Key",
    description: `Create a new API Key. Actions: Account:CreateApiKey`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeCreateApiKeyRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeCreateApiKeyResponse,
  },
  {
    method: "get",
    path: "/accounts/:account/keys/:key",
    alias: "Get API Key",
    description: `Get an API key. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetAccountApiKeyRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "key",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeGetAccountApiKeyResponse,
  },
  {
    method: "delete",
    path: "/accounts/:account/keys/:key",
    alias: "Remove API Key",
    description: `Remove an API key. Actions: Account:RemoveApiKey`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeRemoveApiKeyRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "key",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "patch",
    path: "/accounts/:account/keys/:key",
    alias: "Update API Key",
    description: `Update an API key. Actions: Account:UpdateApiKey`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeUpdateApiKeyRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "key",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeUpdateApiKeyResponse,
  },
  {
    method: "post",
    path: "/accounts/:account/subscribe",
    alias: "Get Account Subscription",
    description: `Subscribe - Get Account Details. Actions: Account:GetAccount`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToAccountRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeAccount,
  },
  {
    method: "delete",
    path: "/accounts/:account/subscribe",
    alias: "Get Account Unsubscription",
    description: `Unsubscribe - Get Account Details. Actions: Account:GetAccount`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToAccountRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "get",
    path: "/accounts/:account/users",
    alias: "Get Account Users",
    description: `Get the users for an account. Actions: Account:GetAccountUser`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ account: z.string() }),
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeAccountUsers,
  },
  {
    method: "post",
    path: "/accounts/:account/users",
    alias: "Add User To Account",
    description: `Add a user to an account. Actions: Account:AddAccountUser`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeAddUserToAccountRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "get",
    path: "/accounts/:account/users/:user",
    alias: "Get Account User",
    description: `Get an Account User&#x27;s information. Actions: Account:GetAccountUser`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetAccountUserRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "user",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeAccountUser,
  },
  {
    method: "delete",
    path: "/accounts/:account/users/:user",
    alias: "Remove User From Account",
    description: `Remove a user from an account. Actions: Account:RemoveAccountUser`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeRemoveUserFromAccountRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "user",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "get",
    path: "/accounts/:account/users/:user/permissions",
    alias: "Get Account User Permissions",
    description: `Get account user permissions. Actions: Account:GetAccountUserPermissions`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetUserAccountsRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "user",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeAccountUserPermissions,
  },
  {
    method: "post",
    path: "/accounts/:account/users/:user/permissions",
    alias: "Set Account User Permissions",
    description: `Set account user permissions. Actions: Account:SetAccountUserPermission`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetAccountUserPermissionsRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "user",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "post",
    path: "/accounts/:account/users/:user/permissions/check",
    alias: "Check Account User Permission",
    description: `Check if a user has the specific permissions needed for use in an account. Actions: Account:GetAccountUserPermissions`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeCheckAccountUserPermissionsRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "user",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "post",
    path: "/accounts/:account/users/:user/permissions/subscribe",
    alias: "Get Account User Permissions Subscription",
    description: `Subscribe - Get account user permissions. Actions: Account:GetAccountUserPermissions`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToUserAccountsRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "user",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "delete",
    path: "/accounts/:account/users/:user/permissions/subscribe",
    alias: "Get Account User Permissions Unsubscription",
    description: `Unsubscribe - Get account user permissions. Actions: Account:GetAccountUserPermissions`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToUserAccountsRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "user",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "post",
    path: "/accounts/:account/users/:user/subscribe",
    alias: "Get Account User Subscription",
    description: `Subscribe - Get an Account User&#x27;s information. Actions: Account:GetAccountUser`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToAccountRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "user",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeAccountUser,
  },
  {
    method: "delete",
    path: "/accounts/:account/users/:user/subscribe",
    alias: "Get Account User Unsubscription",
    description: `Unsubscribe - Get an Account User&#x27;s information. Actions: Account:GetAccountUser`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToAccountRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "user",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "post",
    path: "/accounts/:account/users/subscribe",
    alias: "Get Account Users Subscription",
    description: `Subscribe - Get the users for an account. Actions: Account:GetAccountUser`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToAccountRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeAccountUsers,
  },
  {
    method: "delete",
    path: "/accounts/:account/users/subscribe",
    alias: "Get Account Users Unsubscription",
    description: `Unsubscribe - Get the users for an account. Actions: Account:GetAccountUser`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToAccountRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "get",
    path: "/accounts/keys/token",
    alias: "Get Token From API Key",
    description: `Get a token from an API key. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ apiKey: z.string() }),
      },
    ],
    response: XubeGetTokenFromApiKeyResponse,
  },
  {
    method: "get",
    path: "/accounts/users/:user",
    alias: "Get User Accounts",
    description: `Get user accounts. Actions: Account:GetUserAccounts`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetUserAccountsRequest,
      },
      {
        name: "user",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z
      .object({
        data: z.array(
          z.object({
            creator: z.string().optional(),
            created: z.string().datetime({ offset: true }),
            v: z.string(),
            roles: z.array(z.string()),
            name: z.string().optional(),
            id: z.string().min(3),
            type: z.string().min(3).optional(),
            user: z.string().optional(),
            account: z.string().regex(/^[a-zA-Z0-9-_ ]+$/),
            email: z.string(),
          })
        ),
        nextToken: z.string().optional(),
      })
      .passthrough(),
  },
  {
    method: "post",
    path: "/accounts/users/:user/subscribe",
    alias: "Get User Accounts Subscription",
    description: `Subscribe - Get user accounts. Actions: Account:GetUserAccounts`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToUserAccountsRequest,
      },
      {
        name: "user",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "delete",
    path: "/accounts/users/:user/subscribe",
    alias: "Get User Accounts Unsubscription",
    description: `Unsubscribe - Get user accounts. Actions: Account:GetUserAccounts`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToUserAccountsRequest,
      },
      {
        name: "user",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "post",
    path: "/auth/log-in",
    alias: "Log in",
    description: `Log into your account. Actions: user:LogIn`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeLogInRequest,
      },
    ],
    response: XubeLogInResponse,
  },
  {
    method: "post",
    path: "/auth/refresh",
    alias: "Refresh token",
    description: `Refresh authentication token. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ refreshToken: z.string() }),
      },
    ],
    response: z.object({ token: z.string() }),
  },
  {
    method: "post",
    path: "/auth/sign-up",
    alias: "Sign up",
    description: `Sign up a user. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSignUpRequest,
      },
    ],
    response: z.object({ id: z.string().min(3) }),
  },
  {
    method: "post",
    path: "/components/",
    alias: "Create Component",
    description: `Create a new component. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeCreateComponentRequest,
      },
    ],
    response: z.object({ id: z.string().min(3) }),
  },
  {
    method: "get",
    path: "/components/:component",
    alias: "Get Component",
    description: `Get a component. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ component: z.string() }),
      },
      {
        name: "component",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeComponent,
  },
  {
    method: "get",
    path: "/components/:component/children",
    alias: "Get Children",
    description: `Get Children. Actions: Component:GetChildren`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetChildrenRequest,
      },
      {
        name: "COMPONENT_TYPE_FIELD",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "component",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeGetChildrenResponse,
  },
  {
    method: "post",
    path: "/components/:component/children",
    alias: "Add Children",
    description: `Add children to component. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeAddChildrenRequest,
      },
      {
        name: "component",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "delete",
    path: "/components/:component/children",
    alias: "Remove Children",
    description: `Remove children from component. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeRemoveChildrenRequest,
      },
      {
        name: "component",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "post",
    path: "/components/:component/children/subscribe",
    alias: "Get Children Subscription",
    description: `Subscribe - Get Children. Actions: Component:GetChildren`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToChildrenRequest,
      },
      {
        name: "COMPONENT_TYPE_FIELD",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "component",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "delete",
    path: "/components/:component/children/subscribe",
    alias: "Get Children Unsubscription",
    description: `Unsubscribe - Get Children. Actions: Component:GetChildren`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToChildrenRequest,
      },
      {
        name: "COMPONENT_TYPE_FIELD",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "component",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeDeleteSubscriptionRequest,
  },
  {
    method: "get",
    path: "/components/:component/parents",
    alias: "Get Parents",
    description: `Get Parents. Actions: Component:GetChildren`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetParentsRequest,
      },
      {
        name: "COMPONENT_TYPE_FIELD",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "component",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeGetParentsResponse,
  },
  {
    method: "post",
    path: "/components/:component/parents/subscribe",
    alias: "Get Parents Subscription",
    description: `Subscribe - Get Parents. Actions: Component:GetChildren`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.array(
          z
            .object({
              parent: z.string(),
              creator: z.string().optional(),
              created: z.string().datetime({ offset: true }).optional(),
              name: z.string().optional(),
              id: z.string().min(3),
              type: z.string().min(3).optional(),
              child: z.string(),
            })
            .passthrough()
        ),
      },
      {
        name: "COMPONENT_TYPE_FIELD",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "component",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "delete",
    path: "/components/:component/parents/subscribe",
    alias: "Get Parents Unsubscription",
    description: `Unsubscribe - Get Parents. Actions: Component:GetChildren`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.array(
          z
            .object({
              parent: z.string(),
              creator: z.string().optional(),
              created: z.string().datetime({ offset: true }).optional(),
              name: z.string().optional(),
              id: z.string().min(3),
              type: z.string().min(3).optional(),
              child: z.string(),
            })
            .passthrough()
        ),
      },
      {
        name: "COMPONENT_TYPE_FIELD",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "component",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeDeleteSubscriptionRequest,
  },
  {
    method: "get",
    path: "/components/accounts/:account",
    alias: "Get Account Components",
    description: `Get Account Components. Actions: Component:GetAccountComponents`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetAccountComponentsRequest,
      },
      {
        name: "componentType",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeGetAccountComponentsResponse,
  },
  {
    method: "post",
    path: "/components/accounts/:account/subscribe",
    alias: "Get Account Components Subscription",
    description: `Subscribe - Get Account Components. Actions: Component:GetAccountComponents`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToAccountComponentsRequest,
      },
      {
        name: "componentType",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "delete",
    path: "/components/accounts/:account/subscribe",
    alias: "Get Account Components Unsubscription",
    description: `Unsubscribe - Get Account Components. Actions: Component:GetAccountComponents`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToAccountComponentsRequest,
      },
      {
        name: "componentType",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeDeleteSubscriptionRequest,
  },
  {
    method: "post",
    path: "/dashboards/",
    alias: "Create Dashboard",
    description: `Create a dashboard. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeCreateDashboardRequest,
      },
    ],
    response: z.object({ id: z.string().min(3) }),
  },
  {
    method: "get",
    path: "/dashboards/:dashboard",
    alias: "Get Dashboard",
    description: `Get a dashboard. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ dashboard: z.string() }),
      },
      {
        name: "dashboard",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeDashboard,
  },
  {
    method: "patch",
    path: "/dashboards/:dashboard",
    alias: "Update Dashboard",
    description: `Update a dashboard. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeUpdateDashboardRequest,
      },
      {
        name: "dashboard",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeDashboard,
  },
  {
    method: "get",
    path: "/dashboards/accounts/:account",
    alias: "Get Account Dashboards",
    description: `Get account dashboards. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ account: z.string() }),
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeGetAccountDashboardsResponse,
  },
  {
    method: "get",
    path: "/dashboards/accounts/:account/users/:user/favourites",
    alias: "Get Favourite Dashboards",
    description: `Get Favourite Dashboards. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetFavouriteDashboardsRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "user",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeGetFavouriteDashboardsResponse,
  },
  {
    method: "post",
    path: "/dashboards/accounts/:account/users/:user/favourites",
    alias: "Set Dashboard as Favourite",
    description: `Set Dashboards as Favourites. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetDashboardsAsFavouriteRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "user",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "delete",
    path: "/dashboards/accounts/:account/users/:user/favourites",
    alias: "Remove Dashboards from Favourites",
    description: `Remove Dashboards from Favourites. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetDashboardsAsFavouriteRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "user",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "get",
    path: "/data/accounts/:account/destination",
    alias: "Get Current Data Destination",
    description: `Get current data destination. Actions: Data:GetDataDestination`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ account: z.string() }),
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeDataDestination,
  },
  {
    method: "post",
    path: "/data/accounts/:account/destination/subscribe",
    alias: "Get Current Data Destination Subscription",
    description: `Subscribe - Get current data destination. Actions: Data:GetDataDestination`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToCurrentDataDestinationRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "delete",
    path: "/data/accounts/:account/destination/subscribe",
    alias: "Get Current Data Destination Unsubscription",
    description: `Unsubscribe - Get current data destination. Actions: Data:GetDataDestination`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToCurrentDataDestinationRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "patch",
    path: "/data/accounts/:account/subscribe",
    alias: "Subscribe to Data",
    description: `Subscribe to your Account Data. Actions: Data:SubscribeToData`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToDataRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "post",
    path: "/data/accounts/:account/subscribe/confirm",
    alias: "Confirm Destination",
    description: `Confirm Data Destination. Actions: Data:ConfirmDestination`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeConfirmDestinationRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "post",
    path: "/data/accounts/:account/subscribe/resend",
    alias: "Resend Destination Confirmation",
    description: `Resend Data Destination Confirmation. Actions: Data:ResendDestinationConfirmation`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ account: z.string() }),
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ destination: z.string() }),
  },
  {
    method: "get",
    path: "/devices/",
    alias: "Subscribe to Devices",
    description: `Subscribe to Devices. Actions: Device:GetDeviceInstance`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetDevicesRequestModelName,
      },
    ],
    response: z.array(
      z
        .object({
          generation: z.string(),
          creator: z.string().optional(),
          modelId: z.string().optional(),
          created: z.string().datetime({ offset: true }).optional(),
          certificate: z
            .object({ certificateArn: z.string() })
            .partial()
            .optional(),
          name: z.string().optional(),
          model: z.string(),
          id: z.string().min(3),
          type: z.string().min(3).optional(),
          make: z.string(),
        })
        .passthrough()
    ),
  },
  {
    method: "get",
    path: "/devices/:device",
    alias: "Get Device",
    description: `Get Device. Actions: Device:GetDeviceInstance`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ device: z.string() }),
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeDevice,
  },
  {
    method: "patch",
    path: "/devices/:device",
    alias: "Update Device",
    description: `Update a device. Actions: Device:UpdateDeviceInstance`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeUpdateDeviceRequest,
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeDevice,
  },
  {
    method: "get",
    path: "/devices/:device/account",
    alias: "Get Device Account",
    description: `Get a device&#x27;s account. Actions: Device:GetDeviceAccount`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ device: z.string() }),
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeDeviceAccount,
  },
  {
    method: "get",
    path: "/devices/:device/activation",
    alias: "Get Device Latest Activation Status",
    description: `Get the device latest activation status. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetDeviceLatestActivationStatusRequest,
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeDeviceActivationStatus,
  },
  {
    method: "post",
    path: "/devices/:device/activation",
    alias: "Set Device Activation Status",
    description: `Set the device activation status. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetDeviceActivationStatusRequest,
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "post",
    path: "/devices/:device/commands",
    alias: "Send Command to Device",
    description: `Send a command to a device. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ device: z.string() }),
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "get",
    path: "/devices/:device/config/download",
    alias: "Get Device Config Download URL",
    description: `Get Device Config Download URL. Actions: Device:GetDeviceConfiguration`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ device: z.string() }),
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.string(),
  },
  {
    method: "get",
    path: "/devices/:device/config/update",
    alias: "Get Device Config Update",
    description: `Get Device Config Update. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ device: z.string() }),
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeDeviceUpdate,
  },
  {
    method: "patch",
    path: "/devices/:device/config/update",
    alias: "Set Device Config Update",
    description: `Set Device Config Update. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetDeviceUpdateRequest,
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeDeviceUpdate,
  },
  {
    method: "post",
    path: "/devices/:device/config/update/approval",
    alias: "Set Config Update Approval",
    description: `Set Config Update Approval. Actions: Device:SetConfigUpdateApproval`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetUpdateApprovalRequest,
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "post",
    path: "/devices/:device/config/update/subscribe",
    alias: "Get Device Config Update Subscription",
    description: `Subscribe - Get Device Config Update. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToDevice,
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeDeviceUpdate,
  },
  {
    method: "delete",
    path: "/devices/:device/config/update/subscribe",
    alias: "Get Device Config Update Unsubscription",
    description: `Unsubscribe - Get Device Config Update. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToDevice,
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "post",
    path: "/devices/:device/engine/restart",
    alias: "Restart Device Engine",
    description: `Restart the device engine. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ device: z.string() }),
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ job: z.string() }),
  },
  {
    method: "post",
    path: "/devices/:device/engine/start",
    alias: "Start Device Engine",
    description: `Start the device engine. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ device: z.string() }),
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ job: z.string() }),
  },
  {
    method: "post",
    path: "/devices/:device/engine/stop",
    alias: "Stop Device Engine",
    description: `Stop the device engine. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ device: z.string() }),
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ job: z.string() }),
  },
  {
    method: "get",
    path: "/devices/:device/files",
    alias: "Get Device Files",
    description: `Get Device Files. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ device: z.string() }),
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeGetDeviceFilesResponse,
  },
  {
    method: "get",
    path: "/devices/:device/files/download",
    alias: "Get Device Files Download URL",
    description: `Get Device Files Download URL. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ device: z.string() }),
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.string(),
  },
  {
    method: "get",
    path: "/devices/:device/files/upload",
    alias: "Get Device Files Upload URL",
    description: `Get Device Files Upload URL. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ device: z.string() }),
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.string(),
  },
  {
    method: "post",
    path: "/devices/:device/firmware",
    alias: "Set Expected Firmware Version",
    description: `Set Expected Firmware Version. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetFirmwareVersionRequest,
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "get",
    path: "/devices/:device/firmware/check",
    alias: "Check Firmware Version",
    description: `Check Firmware Version. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ device: z.string() }),
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ version: z.string() }),
  },
  {
    method: "get",
    path: "/devices/:device/firmware/download",
    alias: "Get Device Firmware Download URL",
    description: `Get Device Firmware Download URL. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeFirmwareRequest,
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.string(),
  },
  {
    method: "get",
    path: "/devices/:device/firmware/download/latest",
    alias: "Get Latest Device Firmware Download URL",
    description: `Get Latest Device Firmware Download URL. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ device: z.string() }),
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.string(),
  },
  {
    method: "get",
    path: "/devices/:device/firmware/update",
    alias: "Get Device Firmware Update",
    description: `Get Device Firmware Update. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ device: z.string() }),
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeDeviceUpdate,
  },
  {
    method: "patch",
    path: "/devices/:device/firmware/update",
    alias: "Set Device Firmware Update",
    description: `Set Device Firmware Update. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetDeviceUpdateRequest,
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeDeviceUpdate,
  },
  {
    method: "post",
    path: "/devices/:device/firmware/update/approval",
    alias: "Set Firmware Update Approval",
    description: `Set Firmware Update Approval. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetUpdateApprovalRequest,
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "post",
    path: "/devices/:device/firmware/update/subscribe",
    alias: "Get Device Firmware Update Subscription",
    description: `Subscribe - Get Device Firmware Update. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToDevice,
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeDeviceUpdate,
  },
  {
    method: "delete",
    path: "/devices/:device/firmware/update/subscribe",
    alias: "Get Device Firmware Update Unsubscription",
    description: `Unsubscribe - Get Device Firmware Update. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToDevice,
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "get",
    path: "/devices/:device/firmware/upload",
    alias: "Get Device Firmware Upload URL",
    description: `Get Device Firmware Upload URL. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ device: z.string() }),
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.string(),
  },
  {
    method: "get",
    path: "/devices/:device/heartbeats",
    alias: "Get Device Heartbeats",
    description: `Get Device Heartbeats. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetDeviceHeartbeatsRequest,
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeGetDeviceHeartbeatsResponse,
  },
  {
    method: "post",
    path: "/devices/:device/heartbeats/subscribe",
    alias: "Get Device Heartbeats Subscription",
    description: `Subscribe - Get Device Heartbeats. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToDevice,
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "delete",
    path: "/devices/:device/heartbeats/subscribe",
    alias: "Get Device Heartbeats Unsubscription",
    description: `Unsubscribe - Get Device Heartbeats. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToDevice,
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "get",
    path: "/devices/:device/location",
    alias: "Get Device Location",
    description: `Get the device location. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ device: z.string() }),
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeDeviceLocation,
  },
  {
    method: "post",
    path: "/devices/:device/location",
    alias: "Set Device Location",
    description: `Set the device location. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetDeviceLocationRequest,
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "delete",
    path: "/devices/:device/location",
    alias: "Clear Device Location",
    description: `Clear the device location. Actions: Device:ClearDeviceLocation`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ device: z.string() }),
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "get",
    path: "/devices/:device/models",
    alias: "Get Device Model By Device Id",
    description: `Get device model by device id. Actions: Device:GetDeviceInstance, Device:GetDevice`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetDevicesRequestModelName,
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeDeviceModel,
  },
  {
    method: "post",
    path: "/devices/:device/restart",
    alias: "Restart Device",
    description: `Restart a device. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ device: z.string() }),
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ job: z.string() }),
  },
  {
    method: "post",
    path: "/devices/:device/restart/connected",
    alias: "Restart Connected Devices",
    description: `Restart connected devices. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeResetConnectedDevicesRequest,
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ job: z.string() }),
  },
  {
    method: "get",
    path: "/devices/:device/status",
    alias: "Get Device Status",
    description: `Get Device Status. Actions: Device:GetDeviceStatus`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ device: z.string() }),
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeDeviceStatus,
  },
  {
    method: "post",
    path: "/devices/:device/status",
    alias: "Request Status from Device",
    description: `Request Status from Device. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ device: z.string() }),
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ job: z.string() }),
  },
  {
    method: "post",
    path: "/devices/:device/status/subscribe",
    alias: "Get Device Status Subscription",
    description: `Subscribe - Get Device Status. Actions: Device:GetDeviceStatus`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToDevice,
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeDeviceStatus,
  },
  {
    method: "delete",
    path: "/devices/:device/status/subscribe",
    alias: "Get Device Status Unsubscription",
    description: `Unsubscribe - Get Device Status. Actions: Device:GetDeviceStatus`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToDevice,
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "post",
    path: "/devices/:device/subscribe",
    alias: "Get Device Subscription",
    description: `Subscribe - Get Device. Actions: Device:GetDeviceInstance`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToDevice,
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "delete",
    path: "/devices/:device/subscribe",
    alias: "Get Device Unsubscription",
    description: `Unsubscribe - Get Device. Actions: Device:GetDeviceInstance`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToDevice,
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "get",
    path: "/devices/:device/versions",
    alias: "List Device Versions",
    description: `List device versions. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ device: z.string() }),
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeGetDeviceVersionsResponse,
  },
  {
    method: "get",
    path: "/devices/:device/versions/:version/download",
    alias: "Get Device Version Download URL",
    description: `Get a device version&#x27;s download URL. Actions: Device:GetDeviceVersions`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetDeviceVersionDownloadUrlRequest,
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "version",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.string(),
  },
  {
    method: "get",
    path: "/devices/:device/versions/upload",
    alias: "Get Device Version Upload URL",
    description: `Get a device version upload URL. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ device: z.string() }),
      },
      {
        name: "device",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.string(),
  },
  {
    method: "get",
    path: "/devices/accounts/:account",
    alias: "Get Account Devices",
    description: `Get Account Devices. Actions: Device:ListAccountDevices`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeAccountDevicesRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeAccountDevices,
  },
  {
    method: "post",
    path: "/devices/accounts/:account/subscribe",
    alias: "Get Account Devices Subscription",
    description: `Subscribe - Get Account Devices. Actions: Device:ListAccountDevices`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToAccountDevicesRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "delete",
    path: "/devices/accounts/:account/subscribe",
    alias: "Get Account Devices Unsubscription",
    description: `Unsubscribe - Get Account Devices. Actions: Device:ListAccountDevices`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToAccountDevicesRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "post",
    path: "/devices/config/copy",
    alias: "Copy Device Config to Devices",
    description: `Copy Device Config to Devices. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeCopyDeviceConfigRequest,
      },
    ],
    response: z.boolean(),
  },
  {
    method: "get",
    path: "/devices/firmware",
    alias: "List Firmware Versions",
    description: `List Firmware Versions. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeFirmwareRequest,
      },
    ],
    response: XubeFirmwares,
  },
  {
    method: "post",
    path: "/devices/firmware",
    alias: "Set Expected Firmware Versions",
    description: `Set Expected Firmware Versions. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetFirmwareVersionsRequest,
      },
    ],
    response: z.boolean(),
  },
  {
    method: "get",
    path: "/devices/firmware/download",
    alias: "Get Firmware Download URL",
    description: `Get Firmware Download URL. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeFirmwareRequest,
      },
    ],
    response: z.string(),
  },
  {
    method: "get",
    path: "/devices/heartbeats",
    alias: "Get Devices Heartbeats",
    description: `Get Devices Heartbeats. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetDevicesHeartbeatsRequest,
      },
    ],
    response: XubeGetDevicesHeartbeatsResponse,
  },
  {
    method: "get",
    path: "/devices/models",
    alias: "Get Device Models",
    description: `Get device models. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({}).partial(),
      },
    ],
    response: XubeGetDeviceModelsResponse,
  },
  {
    method: "get",
    path: "/devices/status",
    alias: "Subscribe to Devices Status",
    description: `Subscribe to Devices Status. Actions: Device:GetDeviceStatus`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetDevicesStatusRequestModelName,
      },
    ],
    response: XubeDevicesStatusModelName,
  },
  {
    method: "post",
    path: "/devices/status",
    alias: "Request Devices Status",
    description: `Request statuses from Devices. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ device: z.string() }),
      },
    ],
    response: z.boolean(),
  },
  {
    method: "post",
    path: "/devices/status/subscribe",
    alias: "Subscribe to Devices Status Subscriptions",
    description: `Subscriptions - Subscribe to Devices Status. Actions: Device:GetDeviceStatus`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToDevicesStatusRequest,
      },
    ],
    response: z.boolean(),
  },
  {
    method: "post",
    path: "/devices/subscribe",
    alias: "Subscribe to Devices Subscriptions",
    description: `Subscriptions - Subscribe to Devices. Actions: Device:GetDeviceInstance`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSubscribeToDevicesRequestModelName,
      },
    ],
    response: z.boolean(),
  },
  {
    method: "get",
    path: "/docs/",
    alias: "Get API Docs",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({}).partial().passthrough(),
      },
    ],
    response: z.string(),
  },
  {
    method: "get",
    path: "/docs/provisioning",
    alias: "Get Provisioning Docs",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({}).partial().passthrough(),
      },
    ],
    response: z.string(),
  },
  {
    method: "post",
    path: "/groups/",
    alias: "Create Group",
    description: `Create a group. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeCreateGroupRequest,
      },
    ],
    response: z.object({ id: z.string().min(3) }),
  },
  {
    method: "get",
    path: "/groups/:group",
    alias: "Get Group",
    description: `Get a group. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ group: z.string() }),
      },
      {
        name: "group",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeGroup,
  },
  {
    method: "patch",
    path: "/groups/:group",
    alias: "Update Group",
    description: `Update a group. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeUpdateGroupRequest,
      },
      {
        name: "group",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ id: z.string().min(3) }),
  },
  {
    method: "get",
    path: "/groups/:group/children",
    alias: "Get Children1",
    description: `Get children of a group. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ group: z.string() }),
      },
      {
        name: "group",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeGetGroupChildrenResponse,
  },
  {
    method: "post",
    path: "/groups/:group/children",
    alias: "Add Children1",
    description: `Add children to a group. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeAddChildrenToGroupRequest,
      },
      {
        name: "group",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "delete",
    path: "/groups/:group/children",
    alias: "Remove Children1",
    description: `Remove children from a group. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeRemoveChildrenFromGroupRequest,
      },
      {
        name: "group",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "get",
    path: "/groups/accounts/:account",
    alias: "Get Account Groups",
    description: `Get account groups. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetAccountGroupsRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeGetAccountGroupsResponse,
  },
  {
    method: "post",
    path: "/systems/designs",
    alias: "Create System Design",
    description: `Create a new system design. Actions: system:create-system-design`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeCreateSystemDesignRequest,
      },
    ],
    response: z.object({ id: z.string().min(3) }),
  },
  {
    method: "get",
    path: "/systems/designs/accounts/:account",
    alias: "Get System Designs",
    description: `Get the system designs for an account. Actions: system:get-system-design`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetSystemDesignsRequest,
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeGetSystemDesignsResponse,
  },
  {
    method: "get",
    path: "/transactions/accounts/:account",
    alias: "Get Transactions Count",
    description: `Get transactions count. Actions: transaction:GetTransactionsCountInstance`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetTransactionCountRequest,
      },
      {
        name: "from",
        type: "Query",
        schema: z.string(),
      },
      {
        name: "to",
        type: "Query",
        schema: z.string(),
      },
      {
        name: "account",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: XubeGetTransactionCountResponse,
  },
  {
    method: "get",
    path: "/users/:user",
    alias: "Get User",
    description: `Get user details. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ user: z.string().email() }),
      },
      {
        name: "user",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z
      .object({
        deleted: z.string().datetime({ offset: true }).optional(),
        v: z.string(),
        created: z.string().datetime({ offset: true }),
        name: z.string(),
        id: z.string().min(3),
        email: z.string().email(),
      })
      .passthrough(),
  },
]);

export const xubeDev = new Zodios("https://api.dev.xube.dev", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, {
    ...options,
    axiosConfig: {
      ...(options?.axiosConfig ?? {}),
      headers: {
        ...(options?.axiosConfig?.headers ?? {}),
      },
    },
  });
}
