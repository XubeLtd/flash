import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";



export const XubeSubscribeToUserAccountsRequest = z.object({ headers: z.record(z.string()).optional(), subscriptionPath: z.string(), nextToken: z.string().optional(), limit: z.number().optional(), destination: z.string(), user: z.string().email(), descending: z.boolean().optional().default(false) });
export type TXubeSubscribeToUserAccountsRequest = z.infer<typeof XubeSubscribeToUserAccountsRequest>;
export const XubeBoolean = z.boolean();
export type TXubeBoolean = z.infer<typeof XubeBoolean>;
export const XubeDeleteSubscriptionResponse = z.boolean();
export type TXubeDeleteSubscriptionResponse = z.infer<typeof XubeDeleteSubscriptionResponse>;
export const XubeSubscribeToAccountRequest = z.object({ headers: z.record(z.string()).optional(), subscriptionPath: z.string(), destination: z.string(), account: z.string() });
export type TXubeSubscribeToAccountRequest = z.infer<typeof XubeSubscribeToAccountRequest>;
export const XubeAccount = z.object({ creator: z.string(), created: z.string().datetime({ offset: true }), name: z.string().regex(/^[a-zA-Z0-9-_ ]+$/), accountTypes: z.array(z.enum(["BusinessPartner", "Customer", "DevelopmentPartner", "Educator", "Emerging", "Fulfiller", "Reseller", "Installer", "Startup", "Supplier", "Xube"])).optional(), id: z.string().min(3), avatar: z.string().optional(), type: z.string().min(3).optional(), specialDiscountPercentage: z.number().optional(), email: z.string().optional() });
export type TXubeAccount = z.infer<typeof XubeAccount>;
export const XubeGetAccountRequest = z.object({ account: z.string() });
export type TXubeGetAccountRequest = z.infer<typeof XubeGetAccountRequest>;
export const XubeGetAccountResponse = z.object({ creator: z.string(), created: z.string().datetime({ offset: true }), name: z.string().regex(/^[a-zA-Z0-9-_ ]+$/), accountTypes: z.array(z.enum(["BusinessPartner", "Customer", "DevelopmentPartner", "Educator", "Emerging", "Fulfiller", "Reseller", "Installer", "Startup", "Supplier", "Xube"])).optional(), id: z.string().min(3), avatar: z.string().optional(), type: z.string().min(3).optional(), specialDiscountPercentage: z.number().optional(), email: z.string().optional() });
export type TXubeGetAccountResponse = z.infer<typeof XubeGetAccountResponse>;
export const XubeGetAccountUserRequest = z.object({ user: z.string(), account: z.string() });
export type TXubeGetAccountUserRequest = z.infer<typeof XubeGetAccountUserRequest>;
export const XubeAccountUser = z.object({ creator: z.string().optional(), created: z.string().datetime({ offset: true }), v: z.string(), roles: z.array(z.string()), name: z.string().optional(), id: z.string().min(3), type: z.string().min(3).optional(), user: z.string().optional(), account: z.string().regex(/^[a-zA-Z0-9-_ ]+$/), email: z.string() });
export type TXubeAccountUser = z.infer<typeof XubeAccountUser>;
export const XubeRemoveUserFromAccountRequest = z.object({ user: z.string(), account: z.string() });
export type TXubeRemoveUserFromAccountRequest = z.infer<typeof XubeRemoveUserFromAccountRequest>;
export const XubeGetUserAccountsRequest = z.object({ nextToken: z.string().optional(), limit: z.number().optional(), user: z.string().email(), descending: z.boolean().optional().default(false) });
export type TXubeGetUserAccountsRequest = z.infer<typeof XubeGetUserAccountsRequest>;
export const XubeGetUserAccountsResponse = z.object({ data: z.array(z.object({ creator: z.string().optional(), created: z.string().datetime({ offset: true }), v: z.string(), roles: z.array(z.string()), name: z.string().optional(), id: z.string().min(3), type: z.string().min(3).optional(), user: z.string().optional(), account: z.string().regex(/^[a-zA-Z0-9-_ ]+$/), email: z.string() })), nextToken: z.string().optional() }).passthrough();
export type TXubeGetUserAccountsResponse = z.infer<typeof XubeGetUserAccountsResponse>;
export const XubeGetAccountAvatarUploadUrlRequest = z.object({ imageType: z.enum(["jpeg", "svg", "png", "gif"]), account: z.string() });
export type TXubeGetAccountAvatarUploadUrlRequest = z.infer<typeof XubeGetAccountAvatarUploadUrlRequest>;
export const XubeGetAccountAvatarUploadUrlResponse = z.object({ url: z.string() });
export type TXubeGetAccountAvatarUploadUrlResponse = z.infer<typeof XubeGetAccountAvatarUploadUrlResponse>;
export const XubeGetAccountApiKeysRequest = z.object({ account: z.string() });
export type TXubeGetAccountApiKeysRequest = z.infer<typeof XubeGetAccountApiKeysRequest>;
export const XubeApiKeys = z.object({ data: z.array(z.object({ lastUsed: z.string().datetime({ offset: true }).optional(), creator: z.string(), expires: z.string().datetime({ offset: true }).optional(), apiKey: z.string(), created: z.string().datetime({ offset: true }), name: z.string().optional(), description: z.string().optional(), id: z.string(), account: z.string() })), nextToken: z.string().optional() });
export type TXubeApiKeys = z.infer<typeof XubeApiKeys>;
export const XubeCreateApiKeyRequest = z.object({ expires: z.string().datetime({ offset: true }).optional(), name: z.string().optional(), description: z.string().optional(), account: z.string() });
export type TXubeCreateApiKeyRequest = z.infer<typeof XubeCreateApiKeyRequest>;
export const XubeCreateApiKeyResponse = z.object({ apiKey: z.string(), id: z.string() });
export type TXubeCreateApiKeyResponse = z.infer<typeof XubeCreateApiKeyResponse>;
export const XubeGetAccountsRequest = z.object({  }).partial();
export type TXubeGetAccountsRequest = z.infer<typeof XubeGetAccountsRequest>;
export const XubeGetAccountsResponse = z.array(z.object({ creator: z.string(), created: z.string().datetime({ offset: true }), name: z.string().regex(/^[a-zA-Z0-9-_ ]+$/), accountTypes: z.array(z.enum(["BusinessPartner", "Customer", "DevelopmentPartner", "Educator", "Emerging", "Fulfiller", "Reseller", "Installer", "Startup", "Supplier", "Xube"])).optional(), id: z.string().min(3), avatar: z.string().optional(), type: z.string().min(3).optional(), specialDiscountPercentage: z.number().optional(), email: z.string().optional() }));
export type TXubeGetAccountsResponse = z.infer<typeof XubeGetAccountsResponse>;
export const XubeCreateAccountRequest = z.object({ name: z.string().regex(/^[a-zA-Z0-9-_ ]+$/), email: z.string().email() });
export type TXubeCreateAccountRequest = z.infer<typeof XubeCreateAccountRequest>;
export const XubeCreateAccountResponse = z.object({ id: z.string() });
export type TXubeCreateAccountResponse = z.infer<typeof XubeCreateAccountResponse>;
export const XubeGetAccountApiKeyRequest = z.object({ account: z.string(), key: z.string() });
export type TXubeGetAccountApiKeyRequest = z.infer<typeof XubeGetAccountApiKeyRequest>;
export const XubeGetAccountApiKeyResponse = z.object({ lastUsed: z.string().datetime({ offset: true }).optional(), creator: z.string(), expires: z.string().datetime({ offset: true }).optional(), apiKey: z.string(), created: z.string().datetime({ offset: true }), name: z.string().optional(), description: z.string().optional(), id: z.string(), account: z.string() });
export type TXubeGetAccountApiKeyResponse = z.infer<typeof XubeGetAccountApiKeyResponse>;
export const XubeRemoveApiKeyRequest = z.object({ account: z.string(), key: z.string() });
export type TXubeRemoveApiKeyRequest = z.infer<typeof XubeRemoveApiKeyRequest>;
export const XubeRemoveApiKeyResponse = z.boolean();
export type TXubeRemoveApiKeyResponse = z.infer<typeof XubeRemoveApiKeyResponse>;
export const XubeUpdateApiKeyRequest = z.object({ expires: z.string().datetime({ offset: true }).optional(), name: z.string().optional(), description: z.string().optional(), account: z.string(), key: z.string() });
export type TXubeUpdateApiKeyRequest = z.infer<typeof XubeUpdateApiKeyRequest>;
export const XubeUpdateApiKeyResponse = z.object({ creator: z.string(), expires: z.string().datetime({ offset: true }).optional(), encryptedApiKey: z.string(), created: z.string().datetime({ offset: true }), SK_GSI1: z.string(), description: z.string().optional(), lastUsed: z.string().datetime({ offset: true }).optional(), lastUsedService: z.string().optional(), PK_GSI1: z.string(), searchHash: z.string(), name: z.string().optional(), SK: z.string(), id: z.string().min(3), PK: z.string(), account: z.string() });
export type TXubeUpdateApiKeyResponse = z.infer<typeof XubeUpdateApiKeyResponse>;
export const XubeCheckAccountUserPermissionsRequest = z.object({ user: z.string(), actions: z.array(z.object({ service: z.string(), action: z.string(), permissionTypes: z.array(z.enum(["ADMIN", "CREATE", "READ", "UPDATE", "DELETE"])).optional() })), account: z.string() });
export type TXubeCheckAccountUserPermissionsRequest = z.infer<typeof XubeCheckAccountUserPermissionsRequest>;
export const XubeAccountUserPermissions = z.array(z.object({ creator: z.string().optional(), service: z.string(), created: z.string().datetime({ offset: true }).optional(), effect: z.enum(["Allow", "Deny"]), name: z.string().optional(), action: z.string(), id: z.string().min(3), type: z.string().min(3).optional(), user: z.string(), ttl: z.number().optional(), account: z.string() }));
export type TXubeAccountUserPermissions = z.infer<typeof XubeAccountUserPermissions>;
export const XubeSetAccountUserPermissionsRequest = z.object({ expiry: z.string().datetime({ offset: true }).optional(), user: z.string(), actions: z.array(z.object({ service: z.string(), effect: z.enum(["Allow", "Deny"]), action: z.string() })), account: z.string() });
export type TXubeSetAccountUserPermissionsRequest = z.infer<typeof XubeSetAccountUserPermissionsRequest>;
export const XubeSetAccountUserPermissionsResponse = z.boolean();
export type TXubeSetAccountUserPermissionsResponse = z.infer<typeof XubeSetAccountUserPermissionsResponse>;
export const XubeAccountUsers = z.object({ data: z.array(z.object({ creator: z.string().optional(), created: z.string().datetime({ offset: true }), v: z.string(), roles: z.array(z.string()), name: z.string().optional(), id: z.string().min(3), type: z.string().min(3).optional(), user: z.string().optional(), account: z.string().regex(/^[a-zA-Z0-9-_ ]+$/), email: z.string() })), nextToken: z.string().optional() });
export type TXubeAccountUsers = z.infer<typeof XubeAccountUsers>;
export const XubeGetTokenFromApiKeyRequest = z.object({ apiKey: z.string() });
export type TXubeGetTokenFromApiKeyRequest = z.infer<typeof XubeGetTokenFromApiKeyRequest>;
export const XubeGetTokenFromApiKeyResponse = z.object({ access_token: z.string(), token_type: z.string(), expires_in: z.number(), email: z.string().email() });
export type TXubeGetTokenFromApiKeyResponse = z.infer<typeof XubeGetTokenFromApiKeyResponse>;
export const XubeAddUserToAccountRequest = z.object({ roles: z.array(z.string()), user: z.string(), account: z.string() });
export type TXubeAddUserToAccountRequest = z.infer<typeof XubeAddUserToAccountRequest>;
export const XubeSubscribeToChildrenRequest = z.object({ componentType: z.string().optional(), headers: z.record(z.string()).optional(), component: z.string(), subscriptionPath: z.string(), nextToken: z.string().optional(), limit: z.number().optional(), destination: z.string(), descending: z.boolean().optional().default(false) });
export type TXubeSubscribeToChildrenRequest = z.infer<typeof XubeSubscribeToChildrenRequest>;
export const XubeDeleteSubscriptionRequest = z.object({ SK: z.string(), destination: z.string(), PK: z.string(), email: z.string() });
export type TXubeDeleteSubscriptionRequest = z.infer<typeof XubeDeleteSubscriptionRequest>;
export const XubeSubscribeToParentsRequest = z.array(z.object({ parent: z.string(), creator: z.string().optional(), created: z.string().datetime({ offset: true }).optional(), name: z.string().optional(), id: z.string().min(3), type: z.string().min(3).optional(), child: z.string() }).passthrough());
export type TXubeSubscribeToParentsRequest = z.infer<typeof XubeSubscribeToParentsRequest>;
export const XubeGetParentsRequest = z.object({ componentType: z.string().optional(), component: z.string() });
export type TXubeGetParentsRequest = z.infer<typeof XubeGetParentsRequest>;
export const XubeGetParentsResponse = z.object({ data: z.array(z.object({ parent: z.string(), creator: z.string().optional(), created: z.string().datetime({ offset: true }).optional(), name: z.string().optional(), id: z.string().min(3), type: z.string().min(3).optional(), child: z.string() }).passthrough()) });
export type TXubeGetParentsResponse = z.infer<typeof XubeGetParentsResponse>;
export const XubeGetAccountComponentsRequest = z.object({ componentType: z.string().optional(), nextToken: z.string().optional(), limit: z.number().optional(), descending: z.boolean().optional().default(false), account: z.string() });
export type TXubeGetAccountComponentsRequest = z.infer<typeof XubeGetAccountComponentsRequest>;
export const XubeGetAccountComponentsResponse = z.object({ data: z.array(z.object({ accountId: z.string().regex(/^[a-zA-Z0-9-_ ]+$/), componentId: z.string().optional(), SK: z.string(), PK: z.string(), id: z.string().min(3) })), nextToken: z.string().optional() });
export type TXubeGetAccountComponentsResponse = z.infer<typeof XubeGetAccountComponentsResponse>;
export const XubeGetChildrenRequest = z.object({ componentType: z.string().optional(), component: z.string(), nextToken: z.string().optional(), limit: z.number().optional(), descending: z.boolean().optional().default(false) });
export type TXubeGetChildrenRequest = z.infer<typeof XubeGetChildrenRequest>;
export const XubeGetChildrenResponse = z.object({ data: z.array(z.object({ parent: z.string(), creator: z.string().optional(), created: z.string().datetime({ offset: true }).optional(), SK: z.string(), name: z.string().optional(), PK: z.string(), id: z.string().min(3), type: z.string().min(3).optional(), child: z.string() })), nextToken: z.string().optional() });
export type TXubeGetChildrenResponse = z.infer<typeof XubeGetChildrenResponse>;
export const XubeAddChildrenRequest = z.object({ component: z.string(), children: z.array(z.string()) });
export type TXubeAddChildrenRequest = z.infer<typeof XubeAddChildrenRequest>;
export const XubeSuccess = z.object({ success: z.boolean() });
export type TXubeSuccess = z.infer<typeof XubeSuccess>;
export const XubeRemoveChildrenRequest = z.object({ component: z.string(), children: z.array(z.string()) });
export type TXubeRemoveChildrenRequest = z.infer<typeof XubeRemoveChildrenRequest>;
export const XubeSubscribeToAccountComponentsRequest = z.object({ componentType: z.string().optional(), headers: z.record(z.string()).optional(), subscriptionPath: z.string(), nextToken: z.string().optional(), limit: z.number().optional(), destination: z.string(), descending: z.boolean().optional().default(false), account: z.string() });
export type TXubeSubscribeToAccountComponentsRequest = z.infer<typeof XubeSubscribeToAccountComponentsRequest>;
export const XubeCreateComponentRequest = z.object({ name: z.string().optional(), id: z.string().min(3).optional(), type: z.string(), account: z.string().regex(/^[a-zA-Z0-9-_ ]+$/) });
export type TXubeCreateComponentRequest = z.infer<typeof XubeCreateComponentRequest>;
export const XubeId = z.object({ id: z.string().min(3) });
export type TXubeId = z.infer<typeof XubeId>;
export const XubeGetComponentRequest = z.object({ component: z.string() });
export type TXubeGetComponentRequest = z.infer<typeof XubeGetComponentRequest>;
export const XubeComponent = z.object({ componentType: z.string(), creator: z.string().optional(), created: z.string().datetime({ offset: true }).optional(), name: z.string().optional(), id: z.string().min(3), type: z.string().min(3).optional() });
export type TXubeComponent = z.infer<typeof XubeComponent>;
export const XubeGetFavouriteDashboardsRequest = z.object({ user: z.string(), account: z.string() });
export type TXubeGetFavouriteDashboardsRequest = z.infer<typeof XubeGetFavouriteDashboardsRequest>;
export const XubeGetFavouriteDashboardsResponse = z.object({ data: z.array(z.object({ accountId: z.string(), creator: z.string().optional(), componentId: z.string(), created: z.string().datetime({ offset: true }).optional(), name: z.string().optional(), id: z.string().min(3), type: z.string().min(3).optional(), userId: z.string() })), nextToken: z.string().optional() });
export type TXubeGetFavouriteDashboardsResponse = z.infer<typeof XubeGetFavouriteDashboardsResponse>;
export const XubeSetDashboardsAsFavouriteRequest = z.object({ user: z.string(), dashboards: z.array(z.string()), account: z.string() });
export type TXubeSetDashboardsAsFavouriteRequest = z.infer<typeof XubeSetDashboardsAsFavouriteRequest>;
export const XubeGetDashboardRequest = z.object({ dashboard: z.string() });
export type TXubeGetDashboardRequest = z.infer<typeof XubeGetDashboardRequest>;
export const XubeDashboard = z.object({ componentType: z.literal("DASHBOARD"), creator: z.string().optional(), components: z.array(z.object({ context: z.object({}).partial().passthrough().optional(), id: z.string(), type: z.enum(["device", "group", "graph", "map", "cardSummaries"]) }).passthrough()).optional(), created: z.string().datetime({ offset: true }).optional(), name: z.string(), description: z.string().optional(), id: z.string().min(3), type: z.string().min(3).optional(), updated: z.string().datetime({ offset: true }).optional(), updater: z.string().optional() });
export type TXubeDashboard = z.infer<typeof XubeDashboard>;
export const XubeUpdateDashboardRequest = z.object({ components: z.array(z.object({ context: z.object({}).partial().passthrough().optional(), id: z.string(), type: z.enum(["device", "group", "graph", "map", "cardSummaries"]) }).passthrough()).optional(), name: z.string().optional(), description: z.string().optional(), dashboard: z.string() });
export type TXubeUpdateDashboardRequest = z.infer<typeof XubeUpdateDashboardRequest>;
export const XubeGetAccountDashboardsRequest = z.object({ account: z.string() });
export type TXubeGetAccountDashboardsRequest = z.infer<typeof XubeGetAccountDashboardsRequest>;
export const XubeGetAccountDashboardsResponse = z.object({ data: z.array(z.object({ accountId: z.string().regex(/^[a-zA-Z0-9-_ ]+$/), componentId: z.string(), SK: z.string(), PK: z.string(), id: z.string().min(3) })), nextToken: z.string().optional() });
export type TXubeGetAccountDashboardsResponse = z.infer<typeof XubeGetAccountDashboardsResponse>;
export const XubeCreateDashboardRequest = z.object({ components: z.array(z.object({ context: z.object({}).partial().passthrough().optional(), id: z.string(), type: z.enum(["device", "group", "graph", "map", "cardSummaries"]) }).passthrough()).optional(), name: z.string(), description: z.string().optional(), id: z.string().min(3).optional(), account: z.string().regex(/^[a-zA-Z0-9-_ ]+$/) });
export type TXubeCreateDashboardRequest = z.infer<typeof XubeCreateDashboardRequest>;
export const XubeCreateDashboardResponse = z.object({ id: z.string().min(3) });
export type TXubeCreateDashboardResponse = z.infer<typeof XubeCreateDashboardResponse>;
export const XubeConfirmDestinationRequest = z.object({ confirmationToken: z.string(), arn: z.string(), account: z.string() });
export type TXubeConfirmDestinationRequest = z.infer<typeof XubeConfirmDestinationRequest>;
export const XubeConfirmDestinationResponse = z.boolean();
export type TXubeConfirmDestinationResponse = z.infer<typeof XubeConfirmDestinationResponse>;
export const XubeSubscribeToCurrentDataDestinationRequest = z.object({ headers: z.record(z.string()).optional(), subscriptionPath: z.string(), destination: z.string(), account: z.string() });
export type TXubeSubscribeToCurrentDataDestinationRequest = z.infer<typeof XubeSubscribeToCurrentDataDestinationRequest>;
export const XubeBooleanModel = z.boolean();
export type TXubeBooleanModel = z.infer<typeof XubeBooleanModel>;
export const XubeResendDataDestinationConfirmationRequest = z.object({ account: z.string() });
export type TXubeResendDataDestinationConfirmationRequest = z.infer<typeof XubeResendDataDestinationConfirmationRequest>;
export const XubeResendDataDestinationConfirmationResponse = z.object({ destination: z.string() });
export type TXubeResendDataDestinationConfirmationResponse = z.infer<typeof XubeResendDataDestinationConfirmationResponse>;
export const XubeSubscribeToDataRequest = z.object({ headers: z.record(z.string()).optional(), destination: z.string(), account: z.string() });
export type TXubeSubscribeToDataRequest = z.infer<typeof XubeSubscribeToDataRequest>;
export const XubeSubscribeToDataResponse = z.boolean();
export type TXubeSubscribeToDataResponse = z.infer<typeof XubeSubscribeToDataResponse>;
export const XubeGetCurrentDataDestinationRequest = z.object({ account: z.string() });
export type TXubeGetCurrentDataDestinationRequest = z.infer<typeof XubeGetCurrentDataDestinationRequest>;
export const XubeDataDestination = z.object({ headers: z.record(z.string()), creator: z.string().optional(), created: z.string().datetime({ offset: true }), destination: z.string(), name: z.string().optional(), id: z.string().min(3), type: z.string().min(3).optional(), account: z.string().regex(/^[a-zA-Z0-9-_ ]+$/), status: z.enum(["disabled", "pending", "awaitingConfirmation", "confirmed", "healthy", "inaccessible", "unauthorized"]) });
export type TXubeDataDestination = z.infer<typeof XubeDataDestination>;
export const XubeGetSubscriptionsByDestinationRequest = z.object({ destination: z.string() });
export type TXubeGetSubscriptionsByDestinationRequest = z.infer<typeof XubeGetSubscriptionsByDestinationRequest>;
export const XubeGetSubscriptionsByTargetsFacetWebhookWebhookFacetResponse = z.object({ delivery: z.object({ lastDeliveryAttempt: z.string().optional(), nextRetryAt: z.string().optional(), lastSuccessfulDelivery: z.string().optional(), failedAttempts: z.number().gte(0).optional().default(0), status: z.enum(["ACTIVE", "PAUSED", "FAILED"]) }).optional().default({"failedAttempts":0,"status":"ACTIVE"}), creator: z.string().optional(), targetId: z.string(), created: z.string().datetime({ offset: true }).optional(), targetType: z.string().optional(), type: z.string().min(3).optional(), destinationId: z.string(), url: z.string(), accountId: z.string().optional(), facetType: z.string().optional(), subscriptionVariant: z.literal("FACET-WEBHOOK"), subscriptionType: z.literal("FACET"), facetId: z.string().optional(), name: z.string().optional(), destinationType: z.literal("WEBHOOK"), id: z.string().min(3) });
export type TXubeGetSubscriptionsByTargetsFacetWebhookWebhookFacetResponse = z.infer<typeof XubeGetSubscriptionsByTargetsFacetWebhookWebhookFacetResponse>;
export const XubeGetSubscriptionsByTargetsDataWebhookWebhookDataResponse = z.object({ delivery: z.object({ lastDeliveryAttempt: z.string().optional(), nextRetryAt: z.string().optional(), lastSuccessfulDelivery: z.string().optional(), failedAttempts: z.number().gte(0).optional().default(0), status: z.enum(["ACTIVE", "PAUSED", "FAILED"]) }).optional().default({"failedAttempts":0,"status":"ACTIVE"}), creator: z.string().optional(), targetId: z.string(), created: z.string().datetime({ offset: true }).optional(), targetType: z.string().optional(), type: z.string().min(3).optional(), destinationId: z.string(), url: z.string(), accountId: z.string().optional(), subscriptionVariant: z.literal("DATA-WEBHOOK"), subscriptionType: z.literal("DATA"), name: z.string().optional(), destinationType: z.literal("WEBHOOK"), id: z.string().min(3) });
export type TXubeGetSubscriptionsByTargetsDataWebhookWebhookDataResponse = z.infer<typeof XubeGetSubscriptionsByTargetsDataWebhookWebhookDataResponse>;
export const XubeGetSubscriptionsByTargetsMemberWebhookWebhookMemberResponse = z.object({ delivery: z.object({ lastDeliveryAttempt: z.string().optional(), nextRetryAt: z.string().optional(), lastSuccessfulDelivery: z.string().optional(), failedAttempts: z.number().gte(0).optional().default(0), status: z.enum(["ACTIVE", "PAUSED", "FAILED"]) }).optional().default({"failedAttempts":0,"status":"ACTIVE"}), creator: z.string().optional(), targetId: z.string(), created: z.string().datetime({ offset: true }).optional(), targetType: z.string().optional(), type: z.string().min(3).optional(), destinationId: z.string(), url: z.string(), accountId: z.string().optional(), subscriptionVariant: z.literal("MEMBER-WEBHOOK"), subscriptionType: z.literal("MEMBER"), name: z.string().optional(), destinationType: z.literal("WEBHOOK"), id: z.string().min(3) });
export type TXubeGetSubscriptionsByTargetsMemberWebhookWebhookMemberResponse = z.infer<typeof XubeGetSubscriptionsByTargetsMemberWebhookWebhookMemberResponse>;
export const XubeGetSubscriptionsByTargetsFacetWebsocketWebsocketFacetResponse = z.object({ delivery: z.object({ lastDeliveryAttempt: z.string().optional(), nextRetryAt: z.string().optional(), lastSuccessfulDelivery: z.string().optional(), failedAttempts: z.number().gte(0).optional().default(0), status: z.enum(["ACTIVE", "PAUSED", "FAILED"]) }).optional().default({"failedAttempts":0,"status":"ACTIVE"}), creator: z.string().optional(), targetId: z.string(), created: z.string().datetime({ offset: true }).optional(), targetType: z.string().optional(), type: z.string().min(3).optional(), destinationId: z.string(), accountId: z.string().optional(), facetType: z.string().optional(), subscriptionVariant: z.literal("FACET-WEBSOCKET"), subscriptionType: z.literal("FACET"), facetId: z.string().optional(), name: z.string().optional(), destinationType: z.literal("WEBSOCKET"), connectionId: z.string(), id: z.string().min(3) });
export type TXubeGetSubscriptionsByTargetsFacetWebsocketWebsocketFacetResponse = z.infer<typeof XubeGetSubscriptionsByTargetsFacetWebsocketWebsocketFacetResponse>;
export const XubeGetSubscriptionsByTargetsDataWebsocketWebsocketDataResponse = z.object({ delivery: z.object({ lastDeliveryAttempt: z.string().optional(), nextRetryAt: z.string().optional(), lastSuccessfulDelivery: z.string().optional(), failedAttempts: z.number().gte(0).optional().default(0), status: z.enum(["ACTIVE", "PAUSED", "FAILED"]) }).optional().default({"failedAttempts":0,"status":"ACTIVE"}), creator: z.string().optional(), targetId: z.string(), created: z.string().datetime({ offset: true }).optional(), targetType: z.string().optional(), type: z.string().min(3).optional(), destinationId: z.string(), accountId: z.string().optional(), subscriptionVariant: z.literal("DATA-WEBSOCKET"), subscriptionType: z.literal("DATA"), name: z.string().optional(), destinationType: z.literal("WEBSOCKET"), connectionId: z.string(), id: z.string().min(3) });
export type TXubeGetSubscriptionsByTargetsDataWebsocketWebsocketDataResponse = z.infer<typeof XubeGetSubscriptionsByTargetsDataWebsocketWebsocketDataResponse>;
export const XubeGetSubscriptionsByTargetsMemberWebsocketWebsocketMemberResponse = z.object({ delivery: z.object({ lastDeliveryAttempt: z.string().optional(), nextRetryAt: z.string().optional(), lastSuccessfulDelivery: z.string().optional(), failedAttempts: z.number().gte(0).optional().default(0), status: z.enum(["ACTIVE", "PAUSED", "FAILED"]) }).optional().default({"failedAttempts":0,"status":"ACTIVE"}), creator: z.string().optional(), targetId: z.string(), created: z.string().datetime({ offset: true }).optional(), targetType: z.string().optional(), type: z.string().min(3).optional(), destinationId: z.string(), accountId: z.string().optional(), subscriptionVariant: z.literal("MEMBER-WEBSOCKET"), subscriptionType: z.literal("MEMBER"), name: z.string().optional(), destinationType: z.literal("WEBSOCKET"), connectionId: z.string(), id: z.string().min(3) });
export type TXubeGetSubscriptionsByTargetsMemberWebsocketWebsocketMemberResponse = z.infer<typeof XubeGetSubscriptionsByTargetsMemberWebsocketWebsocketMemberResponse>;
export const XubeGetSubscriptionsByDestinationResponse = z.object({ data: z.array(
                z.discriminatedUnion("subscriptionVariant", [XubeGetSubscriptionsByTargetsFacetWebhookWebhookFacetResponse, XubeGetSubscriptionsByTargetsDataWebhookWebhookDataResponse, XubeGetSubscriptionsByTargetsMemberWebhookWebhookMemberResponse, XubeGetSubscriptionsByTargetsFacetWebsocketWebsocketFacetResponse, XubeGetSubscriptionsByTargetsDataWebsocketWebsocketDataResponse, XubeGetSubscriptionsByTargetsMemberWebsocketWebsocketMemberResponse])
            ) });
export type TXubeGetSubscriptionsByDestinationResponse = z.infer<typeof XubeGetSubscriptionsByDestinationResponse>;
export const XubeDeleteSubscriptionRequest1 = z.object({ facetType: z.string().optional(), facetId: z.string().optional(), destination: z.string(), target: z.string() });
export type TXubeDeleteSubscriptionRequest1 = z.infer<typeof XubeDeleteSubscriptionRequest1>;
export const XubeDeleteSubscriptionResponse1 = z.object({ success: z.boolean() });
export type TXubeDeleteSubscriptionResponse1 = z.infer<typeof XubeDeleteSubscriptionResponse1>;
export const XubeSendConfirmationToDestinationRequest = z.object({ destination: z.string() });
export type TXubeSendConfirmationToDestinationRequest = z.infer<typeof XubeSendConfirmationToDestinationRequest>;
export const XubeSendConfirmationToDestinationResponse = z.object({ success: z.boolean() });
export type TXubeSendConfirmationToDestinationResponse = z.infer<typeof XubeSendConfirmationToDestinationResponse>;
export const XubeCreateSubscriptionsFacetRequest = z.object({ facetType: z.string().optional(), subscriptionType: z.literal("FACET"), facetId: z.string().optional(), destination: z.string(), targetType: z.string(), target: z.string() }).passthrough();
export type TXubeCreateSubscriptionsFacetRequest = z.infer<typeof XubeCreateSubscriptionsFacetRequest>;
export const XubeCreateSubscriptionsDataRequest = z.object({ subscriptionType: z.literal("DATA"), destination: z.string(), targetType: z.string(), target: z.string() }).passthrough();
export type TXubeCreateSubscriptionsDataRequest = z.infer<typeof XubeCreateSubscriptionsDataRequest>;
export const XubeCreateSubscriptionsMemberRequest = z.object({ subscriptionType: z.literal("MEMBER"), destination: z.string(), targetType: z.string(), target: z.string() }).passthrough();
export type TXubeCreateSubscriptionsMemberRequest = z.infer<typeof XubeCreateSubscriptionsMemberRequest>;
export const XubeCreateSubscriptionsRequest = z.object({ subscriptions: z.array(
                z.discriminatedUnion("subscriptionType", [XubeCreateSubscriptionsFacetRequest, XubeCreateSubscriptionsDataRequest, XubeCreateSubscriptionsMemberRequest])
            ).min(1).max(25) });
export type TXubeCreateSubscriptionsRequest = z.infer<typeof XubeCreateSubscriptionsRequest>;
export const XubeCreateSubscriptionsResponse = z.array(z.object({ id: z.string().min(3) }));
export type TXubeCreateSubscriptionsResponse = z.infer<typeof XubeCreateSubscriptionsResponse>;
export const XubeGetSubscriptionByIdRequest = z.object({ subscription: z.string() });
export type TXubeGetSubscriptionByIdRequest = z.infer<typeof XubeGetSubscriptionByIdRequest>;
export const XubeGetSubscriptionByIdResponse =
                z.discriminatedUnion("subscriptionVariant", [XubeGetSubscriptionsByTargetsFacetWebhookWebhookFacetResponse, XubeGetSubscriptionsByTargetsDataWebhookWebhookDataResponse, XubeGetSubscriptionsByTargetsMemberWebhookWebhookMemberResponse, XubeGetSubscriptionsByTargetsFacetWebsocketWebsocketFacetResponse, XubeGetSubscriptionsByTargetsDataWebsocketWebsocketDataResponse, XubeGetSubscriptionsByTargetsMemberWebsocketWebsocketMemberResponse])
            ;
export type TXubeGetSubscriptionByIdResponse = z.infer<typeof XubeGetSubscriptionByIdResponse>;
export const XubeDeleteSubscriptionByIdRequest = z.object({ subscription: z.string() });
export type TXubeDeleteSubscriptionByIdRequest = z.infer<typeof XubeDeleteSubscriptionByIdRequest>;
export const XubeDeleteSubscriptionByIdResponse = z.object({ success: z.boolean() });
export type TXubeDeleteSubscriptionByIdResponse = z.infer<typeof XubeDeleteSubscriptionByIdResponse>;
export const XubeConfirmDestinationRequest1 = z.object({ destination: z.string(), confirmationToken: z.string() });
export type TXubeConfirmDestinationRequest1 = z.infer<typeof XubeConfirmDestinationRequest1>;
export const XubeConfirmDestinationResponse1 = z.object({ success: z.boolean() });
export type TXubeConfirmDestinationResponse1 = z.infer<typeof XubeConfirmDestinationResponse1>;
export const XubeGetSubscriptionsRequest = z.object({ account: z.string() });
export type TXubeGetSubscriptionsRequest = z.infer<typeof XubeGetSubscriptionsRequest>;
export const XubeGetSubscriptionsResponse = z.object({ data: z.array(
                z.discriminatedUnion("subscriptionVariant", [XubeGetSubscriptionsByTargetsFacetWebhookWebhookFacetResponse, XubeGetSubscriptionsByTargetsDataWebhookWebhookDataResponse, XubeGetSubscriptionsByTargetsMemberWebhookWebhookMemberResponse, XubeGetSubscriptionsByTargetsFacetWebsocketWebsocketFacetResponse, XubeGetSubscriptionsByTargetsDataWebsocketWebsocketDataResponse, XubeGetSubscriptionsByTargetsMemberWebsocketWebsocketMemberResponse])
            ) });
export type TXubeGetSubscriptionsResponse = z.infer<typeof XubeGetSubscriptionsResponse>;
export const XubeCreateDestinationWebhookRequest = z.object({ headers: z.object({ Authorization: z.string(), "x-api-key": z.string() }).partial().passthrough().optional(), name: z.string(), destinationType: z.literal("WEBHOOK"), account: z.string(), url: z.string().url() }).passthrough();
export type TXubeCreateDestinationWebhookRequest = z.infer<typeof XubeCreateDestinationWebhookRequest>;
export const XubeCreateDestinationWebsocketRequest = z.object({ name: z.string(), connectionId: z.string(), destinationType: z.literal("WEBSOCKET"), account: z.string() }).passthrough();
export type TXubeCreateDestinationWebsocketRequest = z.infer<typeof XubeCreateDestinationWebsocketRequest>;
export const XubeCreateDestinationRequest =
                z.discriminatedUnion("destinationType", [XubeCreateDestinationWebhookRequest, XubeCreateDestinationWebsocketRequest])
            ;
export type TXubeCreateDestinationRequest = z.infer<typeof XubeCreateDestinationRequest>;
export const XubeCreateDestinationResponse = z.object({ id: z.string().min(3) });
export type TXubeCreateDestinationResponse = z.infer<typeof XubeCreateDestinationResponse>;
export const XubeConfirmDataDestinationRequest = z.object({ destination: z.string(), confirmationToken: z.string(), arn: z.string() });
export type TXubeConfirmDataDestinationRequest = z.infer<typeof XubeConfirmDataDestinationRequest>;
export const XubeConfirmDataDestinationResponse = z.object({ success: z.boolean() });
export type TXubeConfirmDataDestinationResponse = z.infer<typeof XubeConfirmDataDestinationResponse>;
export const XubeGetDestinationRequest = z.object({ destination: z.string() });
export type TXubeGetDestinationRequest = z.infer<typeof XubeGetDestinationRequest>;
export const XubeGetDestinationsWebhookResponse = z.object({ accountId: z.string(), headers: z.object({ Authorization: z.string(), "x-api-key": z.string() }).partial().passthrough().optional(), creator: z.string().optional(), created: z.string().datetime({ offset: true }).optional(), iotDestination: z.object({ state: z.enum(["NOT_SENT", "PENDING", "CONFIRMED"]), arn: z.string() }).optional(), name: z.string(), destinationType: z.literal("WEBHOOK"), id: z.string().min(3), confirmation: z.object({ state: z.enum(["NOT_SENT", "PENDING", "CONFIRMED"]), sent: z.string().optional(), token: z.string().optional() }), state: z.enum(["ACTIVE", "PENDING", "UNSECURE"]), type: z.string().min(3).optional(), url: z.string().url() });
export type TXubeGetDestinationsWebhookResponse = z.infer<typeof XubeGetDestinationsWebhookResponse>;
export const XubeGetDestinationsWebsocketResponse = z.object({ accountId: z.string(), creator: z.string().optional(), lastHeartbeat: z.string().datetime({ offset: true }), created: z.string().datetime({ offset: true }).optional(), name: z.string(), missedHeartbeats: z.number().gte(0).optional().default(0), destinationType: z.literal("WEBSOCKET"), connectionId: z.string(), id: z.string().min(3), type: z.string().min(3).optional(), status: z.enum(["ACTIVE", "STALE", "DISCONNECTED"]) });
export type TXubeGetDestinationsWebsocketResponse = z.infer<typeof XubeGetDestinationsWebsocketResponse>;
export const XubeGetDestinationResponse =
                z.discriminatedUnion("destinationType", [XubeGetDestinationsWebhookResponse, XubeGetDestinationsWebsocketResponse])
            ;
export type TXubeGetDestinationResponse = z.infer<typeof XubeGetDestinationResponse>;
export const XubeDeleteDestinationRequest = z.object({ destination: z.string() });
export type TXubeDeleteDestinationRequest = z.infer<typeof XubeDeleteDestinationRequest>;
export const XubeDeleteDestinationResponse = z.boolean();
export type TXubeDeleteDestinationResponse = z.infer<typeof XubeDeleteDestinationResponse>;
export const XubeUpdateDestinationRequest = z.object({ headers: z.object({ Authorization: z.string(), "x-api-key": z.string() }).partial().passthrough().optional(), destination: z.string(), name: z.string().optional() });
export type TXubeUpdateDestinationRequest = z.infer<typeof XubeUpdateDestinationRequest>;
export const XubeUpdateDestinationResponse = z.boolean();
export type TXubeUpdateDestinationResponse = z.infer<typeof XubeUpdateDestinationResponse>;
export const XubeGetDestinationsRequest = z.object({ account: z.string() });
export type TXubeGetDestinationsRequest = z.infer<typeof XubeGetDestinationsRequest>;
export const XubeGetDestinationsResponse = z.object({ data: z.array(
                z.discriminatedUnion("destinationType", [XubeGetDestinationsWebhookResponse, XubeGetDestinationsWebsocketResponse])
            ) });
export type TXubeGetDestinationsResponse = z.infer<typeof XubeGetDestinationsResponse>;
export const XubeGetSubscriptionsByTargetsRequest = z.object({ subscriptionType: z.enum(["FACET", "DATA"]).optional(), targets: z.array(z.string()) });
export type TXubeGetSubscriptionsByTargetsRequest = z.infer<typeof XubeGetSubscriptionsByTargetsRequest>;
export const XubeGetSubscriptionsByTargetsResponse = z.object({ data: z.record(z.array(
                z.discriminatedUnion("subscriptionVariant", [XubeGetSubscriptionsByTargetsFacetWebhookWebhookFacetResponse, XubeGetSubscriptionsByTargetsDataWebhookWebhookDataResponse, XubeGetSubscriptionsByTargetsMemberWebhookWebhookMemberResponse, XubeGetSubscriptionsByTargetsFacetWebsocketWebsocketFacetResponse, XubeGetSubscriptionsByTargetsDataWebsocketWebsocketDataResponse, XubeGetSubscriptionsByTargetsMemberWebsocketWebsocketMemberResponse])
            )) });
export type TXubeGetSubscriptionsByTargetsResponse = z.infer<typeof XubeGetSubscriptionsByTargetsResponse>;
export const XubeCancelDeviceUpdateRequest = z.object({ reason: z.string().optional(), device: z.string() });
export type TXubeCancelDeviceUpdateRequest = z.infer<typeof XubeCancelDeviceUpdateRequest>;
export const XubeDeviceRequest = z.object({ device: z.string() });
export type TXubeDeviceRequest = z.infer<typeof XubeDeviceRequest>;
export const XubeDevice = z.object({ generation: z.string(), componentType: z.literal("DEVICE"), creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }), entityType: z.literal("DEVICE"), certificate: z.object({ certificateArn: z.string() }).partial().optional(), description: z.string().optional(), type: z.literal("DEVICE:COMPONENT"), updater: z.string().optional(), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), thingArn: z.string().optional(), service: z.literal("Device"), name: z.string().optional(), model: z.string(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), make: z.string(), modelOrigin: z.object({ versionId: z.string(), modelId: z.string() }) });
export type TXubeDevice = z.infer<typeof XubeDevice>;
export const XubeUpdateDeviceRequest = z.object({ name: z.string().optional(), device: z.string() });
export type TXubeUpdateDeviceRequest = z.infer<typeof XubeUpdateDeviceRequest>;
export const XubeGetAccountFacetRequest = z.object({ facet: z.string(), account: z.string() });
export type TXubeGetAccountFacetRequest = z.infer<typeof XubeGetAccountFacetRequest>;
export const XubeGetAccountFacetsResponse = z.object({ data: z.array(z.object({ component: z.object({ generation: z.string(), componentType: z.literal("DEVICE"), creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }), entityType: z.literal("DEVICE"), certificate: z.object({ certificateArn: z.string() }).partial().optional(), description: z.string().optional(), type: z.literal("DEVICE:COMPONENT"), updater: z.string().optional(), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), thingArn: z.string().optional(), service: z.literal("Device"), name: z.string().optional(), model: z.string(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), make: z.string(), modelOrigin: z.object({ versionId: z.string(), modelId: z.string() }) }).passthrough(), facets: z.array(z.object({ accountId: z.string().optional(), creator: z.string().optional(), facetType: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), entityId: z.string(), id: z.string().min(3), type: z.string().min(3).optional(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), updater: z.string().optional() }).passthrough()) })), nextToken: z.string().optional() });
export type TXubeGetAccountFacetsResponse = z.infer<typeof XubeGetAccountFacetsResponse>;
export const XubeStringModel = z.string();
export type TXubeStringModel = z.infer<typeof XubeStringModel>;
export const XubeSetDevicesSubscriptionsFacetRequest = z.object({ facetType: z.string().optional(), subscriptionType: z.literal("FACET"), facetId: z.string().optional(), destination: z.string(), targets: z.array(z.string()) }).passthrough();
export type TXubeSetDevicesSubscriptionsFacetRequest = z.infer<typeof XubeSetDevicesSubscriptionsFacetRequest>;
export const XubeSetDevicesSubscriptionsDataRequest = z.object({ subscriptionType: z.literal("DATA"), destination: z.string(), targets: z.array(z.string()) }).passthrough();
export type TXubeSetDevicesSubscriptionsDataRequest = z.infer<typeof XubeSetDevicesSubscriptionsDataRequest>;
export const XubeSetDevicesSubscriptionsRequest =
                z.discriminatedUnion("subscriptionType", [XubeSetDevicesSubscriptionsFacetRequest, XubeSetDevicesSubscriptionsDataRequest])
            ;
export type TXubeSetDevicesSubscriptionsRequest = z.infer<typeof XubeSetDevicesSubscriptionsRequest>;
export const XubeSetDevicesSubscriptionsResponse = z.object({ success: z.boolean() });
export type TXubeSetDevicesSubscriptionsResponse = z.infer<typeof XubeSetDevicesSubscriptionsResponse>;
export const XubeGetDeviceDataDestinationRequest = z.object({ destination: z.string().url(), device: z.string() });
export type TXubeGetDeviceDataDestinationRequest = z.infer<typeof XubeGetDeviceDataDestinationRequest>;
export const XubeDeviceDataDestination = z.object({ creator: z.string().optional(), targetId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), destination: z.object({ headers: z.object({ Authorization: z.string(), "x-api-key": z.string() }).partial().passthrough().optional(), id: z.string(), url: z.string().url() }), entityId: z.string(), source: z.object({ id: z.string(), type: z.string() }).optional(), type: z.literal("DEVICE:COMPONENT:FACET:DATA-DESTINATION"), deviceId: z.string(), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("DATA-DESTINATION"), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubeDeviceDataDestination = z.infer<typeof XubeDeviceDataDestination>;
export const XubeGetCanonicalDeviceEventsRequest = z.object({  }).partial();
export type TXubeGetCanonicalDeviceEventsRequest = z.infer<typeof XubeGetCanonicalDeviceEventsRequest>;
export const XubeGetCanonicalDeviceEventsResponse = z.object({ data: z.array(z.object({ level: z.union([z.literal(100), z.literal(200), z.literal(300), z.literal(400), z.literal(500), z.literal(600)]), name: z.string(), description: z.string(), id: z.string(), category: z.string().optional(), updated: z.string().optional() })) });
export type TXubeGetCanonicalDeviceEventsResponse = z.infer<typeof XubeGetCanonicalDeviceEventsResponse>;
export const XubeCreateCanonicalDeviceEventRequest = z.object({ level: z.union([z.literal(100), z.literal(200), z.literal(300), z.literal(400), z.literal(500), z.literal(600)]), name: z.string(), description: z.string(), category: z.string().optional() });
export type TXubeCreateCanonicalDeviceEventRequest = z.infer<typeof XubeCreateCanonicalDeviceEventRequest>;
export const XubeCanonicalDeviceEventResponse = z.object({ level: z.union([z.literal(100), z.literal(200), z.literal(300), z.literal(400), z.literal(500), z.literal(600)]), name: z.string(), description: z.string(), id: z.string(), category: z.string().optional(), updated: z.string().optional() });
export type TXubeCanonicalDeviceEventResponse = z.infer<typeof XubeCanonicalDeviceEventResponse>;
export const XubeRemoveDeviceEventMappingRequest = z.object({ mappingId: z.string(), deviceModelId: z.string(), deviceModelVersionId: z.string() });
export type TXubeRemoveDeviceEventMappingRequest = z.infer<typeof XubeRemoveDeviceEventMappingRequest>;
export const XubeSuccessModel = z.object({ success: z.boolean() });
export type TXubeSuccessModel = z.infer<typeof XubeSuccessModel>;
export const XubeGetAccountFacetsRequest = z.object({ nextToken: z.string().optional(), facetTypes: z.array(z.string()).optional(), limit: z.number().lte(100).optional().default(100), descending: z.boolean().optional().default(false), account: z.string() });
export type TXubeGetAccountFacetsRequest = z.infer<typeof XubeGetAccountFacetsRequest>;
export const XubeJobResponse = z.object({ job: z.string() });
export type TXubeJobResponse = z.infer<typeof XubeJobResponse>;
export const XubeSetUpdateApprovalRequest = z.object({ approval: z.enum(["approved", "denied", "pending"]), conditions: z.array(z.enum(["local", "remote"])).optional(), device: z.string() });
export type TXubeSetUpdateApprovalRequest = z.infer<typeof XubeSetUpdateApprovalRequest>;
export const XubeDeviceFacetsAccountEntityEntityFacetAccount = z.object({ accountId: z.string(), creator: z.string().optional(), facetType: z.literal("ACCOUNT"), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), entityId: z.string(), id: z.string().min(3), type: z.literal("ENTITY:ENTITY:FACET:ACCOUNT"), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), updater: z.string().optional() });
export type TXubeDeviceFacetsAccountEntityEntityFacetAccount = z.infer<typeof XubeDeviceFacetsAccountEntityEntityFacetAccount>;
export const XubeDeviceFacetsActivationStatusDeviceComponentFacetActivationStatus = z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), activationStatus: z.enum(["active", "inactive"]), entityId: z.string(), type: z.literal("DEVICE:COMPONENT:FACET:ACTIVATION-STATUS"), deviceId: z.string(), updater: z.string().optional(), accountId: z.string(), facetType: z.literal("ACTIVATION-STATUS"), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), timestamp: z.string() });
export type TXubeDeviceFacetsActivationStatusDeviceComponentFacetActivationStatus = z.infer<typeof XubeDeviceFacetsActivationStatusDeviceComponentFacetActivationStatus>;
export const XubeDeviceFacetsHeartbeatDeviceComponentFacetHeartbeat = z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("DEVICE:COMPONENT:FACET:HEARTBEAT"), deviceId: z.string(), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("HEARTBEAT"), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), timestamp: z.string() });
export type TXubeDeviceFacetsHeartbeatDeviceComponentFacetHeartbeat = z.infer<typeof XubeDeviceFacetsHeartbeatDeviceComponentFacetHeartbeat>;
export const XubeDeviceFacetsDataDestinationDeviceComponentFacetDataDestination = z.object({ creator: z.string().optional(), targetId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), destination: z.object({ headers: z.object({ Authorization: z.string(), "x-api-key": z.string() }).partial().passthrough().optional(), id: z.string(), url: z.string().url() }), entityId: z.string(), source: z.object({ id: z.string(), type: z.string() }).optional(), type: z.literal("DEVICE:COMPONENT:FACET:DATA-DESTINATION"), deviceId: z.string(), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("DATA-DESTINATION"), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubeDeviceFacetsDataDestinationDeviceComponentFacetDataDestination = z.infer<typeof XubeDeviceFacetsDataDestinationDeviceComponentFacetDataDestination>;
export const XubeDeviceFacetsFilesDeviceComponentFacetFiles = z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), orphaned: z.record(z.object({ path: z.string(), existing: z.array(z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() })).optional(), acceptance: z.object({ accepted: z.boolean(), timestamp: z.string().optional() }).optional(), active: z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() }) })).optional(), entityId: z.string(), storage: z.record(z.object({ path: z.string(), existing: z.array(z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() })).optional(), acceptance: z.object({ accepted: z.boolean(), timestamp: z.string().optional() }).optional(), active: z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() }) })).optional(), type: z.literal("DEVICE:COMPONENT:FACET:FILES"), updater: z.string().optional(), accountId: z.string().optional(), scripting: z.record(z.object({ path: z.string(), existing: z.array(z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() })).optional(), acceptance: z.object({ accepted: z.boolean(), timestamp: z.string().optional() }).optional(), active: z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() }) })).optional(), facetType: z.literal("FILES"), environment: z.object({ release: z.string(), mqttEndpoint: z.string(), region: z.string(), status: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]).optional() }), system: z.object({ firmware: z.object({ path: z.string(), existing: z.array(z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() })).optional(), acceptance: z.object({ accepted: z.boolean(), timestamp: z.string().optional() }).optional(), active: z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() }) }) }), stage: z.enum(["current", "expected", "historical"]), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), communication: z.record(z.object({ path: z.string(), existing: z.array(z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() })).optional(), acceptance: z.object({ accepted: z.boolean(), timestamp: z.string().optional() }).optional(), active: z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() }) })).optional(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), device: z.string(), config: z.record(z.object({ path: z.string(), existing: z.array(z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() })).optional(), acceptance: z.object({ accepted: z.boolean(), timestamp: z.string().optional() }).optional(), active: z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() }) })).optional(), status: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]) });
export type TXubeDeviceFacetsFilesDeviceComponentFacetFiles = z.infer<typeof XubeDeviceFacetsFilesDeviceComponentFacetFiles>;
export const XubeDeviceFacetsLocationEntityComponentFacetLocation = z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), latitude: z.number(), entityId: z.string(), type: z.literal("ENTITY:COMPONENT:FACET:LOCATION"), deviceId: z.string(), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("LOCATION"), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), longitude: z.number() });
export type TXubeDeviceFacetsLocationEntityComponentFacetLocation = z.infer<typeof XubeDeviceFacetsLocationEntityComponentFacetLocation>;
export const XubeDeviceFacetsStatusDeviceComponentFacetStatus = z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), availability: z.object({ lastSeenAt: z.string().optional(), lastReportedAt: z.string().optional(), state: z.enum(["online", "offline", "unknown"]), updated: z.string() }).optional(), type: z.literal("DEVICE:COMPONENT:FACET:STATUS"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("STATUS"), connectivity: z.object({ wifi: z.object({ signalStrength: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.number().optional() }).optional(), connection: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.enum(["connected", "notConnected", "notInUse", "pending"]) }), ssid: z.string().optional() }), cellular: z.object({ signalStrength: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.number().optional() }).optional(), connection: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.enum(["connected", "notConnected", "notInUse", "pending"]) }) }), eth: z.object({ connection: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.enum(["connected", "notConnected", "notInUse", "pending"]) }), mac: z.string().optional() }), platform: z.object({ connection: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.enum(["connected", "notConnected", "notInUse", "pending"]) }) }) }).partial(), engine: z.object({ state: z.enum(["running", "stopped", "error", "unknown"]), updated: z.string() }).optional(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), temperature: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.number() }).optional(), id: z.string().min(3), power: z.object({ auxiliary: z.object({ connection: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.enum(["connected", "notConnected", "notInUse", "pending"]) }), voltage: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.number().optional() }).optional() }).optional(), usb: z.object({ connection: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.enum(["connected", "notConnected", "notInUse", "pending"]) }), voltage: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.number().optional() }).optional() }).optional(), solar: z.object({ connection: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.enum(["connected", "notConnected", "notInUse", "pending"]) }), voltage: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.number().optional() }).optional() }).optional(), source: z.object({ currentSource: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.enum(["battery", "usb", "solar", "auxiliary", "noSource", "unknownSource"]) }) }), battery: z.object({ charge: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.number() }), temperature: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.number() }).optional(), chargingState: z.enum(["charging", "notCharging", "unknown"]) }).optional() }), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), timestamp: z.string() });
export type TXubeDeviceFacetsStatusDeviceComponentFacetStatus = z.infer<typeof XubeDeviceFacetsStatusDeviceComponentFacetStatus>;
export const XubeDeviceFacetsSnapshotDeviceComponentFacetSnapshot = z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), index: z.number(), entityId: z.string(), type: z.literal("DEVICE:COMPONENT:FACET:SNAPSHOT"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("SNAPSHOT"), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), snapshot: z.object({ fw: z.object({ v: z.number() }), cfg: z.record(z.object({ cv: z.number(), v: z.union([z.number(), z.string()]).optional(), n: z.record(z.object({ cv: z.number(), v: z.union([z.number(), z.string()]).optional(), n: z.record(z.object({ cv: z.number(), v: z.union([z.number(), z.string()]).optional(), n: z.record(z.object({ cv: z.number(), v: z.union([z.number(), z.string()]).optional(), n: z.object({}).partial().passthrough().optional() })).optional() })).optional() })).optional() })) }) });
export type TXubeDeviceFacetsSnapshotDeviceComponentFacetSnapshot = z.infer<typeof XubeDeviceFacetsSnapshotDeviceComponentFacetSnapshot>;
export const XubeDeviceFacetsUpdateDeviceComponentFacetUpdate = z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), approval: z.object({ created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }), state: z.enum(["approved", "denied", "pending"]), conditions: z.array(z.enum(["local", "remote"])).optional(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), updater: z.string().optional() }), entityId: z.string(), type: z.literal("DEVICE:COMPONENT:FACET:UPDATE"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("UPDATE"), service: z.string(), mismatch: z.record(z.object({ actual: z.string(), expected: z.string() })).optional(), name: z.string().optional(), isGlobal: z.boolean().optional(), progress: z.record(z.object({ totalSize: z.number(), lastOffset: z.number(), updated: z.string() }).partial()).optional(), id: z.string().min(3), state: z.enum(["waiting_for_device_status", "ready_to_send", "sent", "failed", "in_progress", "completed", "cancelled"]), job: z.string().optional(), conditions: z.array(z.enum(["local", "remote"])).optional(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), device: z.string(), tasks: z.array(z.object({ a: z.enum(["d", "uf", "u", "upd", "r", "cdr", "z", "a", "s", "b", "e", "k", "x", "crash", "t"]), tries: z.number().optional(), topics: z.record(z.string()).optional(), ctx: z.object({}).partial().passthrough().optional(), timeout: z.number().optional() })) });
export type TXubeDeviceFacetsUpdateDeviceComponentFacetUpdate = z.infer<typeof XubeDeviceFacetsUpdateDeviceComponentFacetUpdate>;
export const XubeDeviceFacetsFirmwareInfoDeviceComponentFacetFirmwareInfo = z.object({ creator: z.string().optional(), created: z.string(), firmwareHash: z.string(), firmwareSize: z.number(), entityId: z.string(), type: z.literal("DEVICE:COMPONENT:FACET:FIRMWARE-INFO"), version: z.union([z.string(), z.number()]), deviceId: z.string(), updater: z.string().optional(), target: z.string(), accountId: z.string().optional(), facetType: z.literal("FIRMWARE-INFO"), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), firmwareVersion: z.string(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), key: z.string() });
export type TXubeDeviceFacetsFirmwareInfoDeviceComponentFacetFirmwareInfo = z.infer<typeof XubeDeviceFacetsFirmwareInfoDeviceComponentFacetFirmwareInfo>;
export const XubeDeviceFacetsFirmwareDeviceComponentFacetFirmware = z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("DEVICE:COMPONENT:FACET:FIRMWARE"), deviceId: z.string(), version: z.union([z.string(), z.number()]), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("FIRMWARE"), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), objectVersionId: z.string(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), key: z.string() });
export type TXubeDeviceFacetsFirmwareDeviceComponentFacetFirmware = z.infer<typeof XubeDeviceFacetsFirmwareDeviceComponentFacetFirmware>;
export const XubeDeviceFacetsModelEntityComponentFacetModel = z.object({ creator: z.string().optional(), componentId: z.string(), modelId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("ENTITY:COMPONENT:FACET:MODEL"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("MODEL"), versionId: z.string(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubeDeviceFacetsModelEntityComponentFacetModel = z.infer<typeof XubeDeviceFacetsModelEntityComponentFacetModel>;
export const XubeDeviceFacets = z.array(
                z.discriminatedUnion("facetType", [XubeDeviceFacetsAccountEntityEntityFacetAccount, XubeDeviceFacetsActivationStatusDeviceComponentFacetActivationStatus, XubeDeviceFacetsHeartbeatDeviceComponentFacetHeartbeat, XubeDeviceFacetsDataDestinationDeviceComponentFacetDataDestination, XubeDeviceFacetsFilesDeviceComponentFacetFiles, XubeDeviceFacetsLocationEntityComponentFacetLocation, XubeDeviceFacetsStatusDeviceComponentFacetStatus, XubeDeviceFacetsSnapshotDeviceComponentFacetSnapshot, XubeDeviceFacetsUpdateDeviceComponentFacetUpdate, XubeDeviceFacetsFirmwareInfoDeviceComponentFacetFirmwareInfo, XubeDeviceFacetsFirmwareDeviceComponentFacetFirmware, XubeDeviceFacetsModelEntityComponentFacetModel])
            );
export type TXubeDeviceFacets = z.infer<typeof XubeDeviceFacets>;
export const XubeGetLatestDeviceVersionRequest = z.object({ device: z.string() });
export type TXubeGetLatestDeviceVersionRequest = z.infer<typeof XubeGetLatestDeviceVersionRequest>;
export const XubeFirmwareRequest = z.union([z.object({ device: z.string(), version: z.union([z.literal("current"), z.literal("expected")]) }), z.object({ version: z.string() }), z.object({  }).partial()]);
export type TXubeFirmwareRequest = z.infer<typeof XubeFirmwareRequest>;
export const XubeFirmwares = z.array(z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), forceUpdate: z.boolean().optional(), type: z.string().min(3).optional(), version: z.string(), versionDescriptions: z.record(z.array(z.string())).optional(), partition: z.string().optional(), size: z.number().optional(), name: z.string().optional(), checksum: z.number().optional(), id: z.string().min(3), compatibility: z.array(z.object({ bootloader: z.object({ min: z.string(), max: z.string().optional() }).optional(), firmware: z.object({ min: z.string(), max: z.string().optional() }).optional(), hardware: z.object({ generation: z.object({ min: z.string(), max: z.string().optional() }).optional(), model: z.string(), make: z.string() }) })), key: z.string() }));
export type TXubeFirmwares = z.infer<typeof XubeFirmwares>;
export const XubeSetFirmwareVersionsRequest = z.object({ devices: z.array(z.string()), firmwareVersion: z.string() });
export type TXubeSetFirmwareVersionsRequest = z.infer<typeof XubeSetFirmwareVersionsRequest>;
export const XubeGetDeviceLocationRequest = z.object({ device: z.string() });
export type TXubeGetDeviceLocationRequest = z.infer<typeof XubeGetDeviceLocationRequest>;
export const XubeDeviceLocation = z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), latitude: z.number(), entityId: z.string(), type: z.literal("ENTITY:COMPONENT:FACET:LOCATION"), deviceId: z.string(), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.string(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), longitude: z.number() });
export type TXubeDeviceLocation = z.infer<typeof XubeDeviceLocation>;
export const XubeSetDeviceLocationRequest = z.object({ latitude: z.number().gte(-90).lte(90), device: z.string(), longitude: z.number().gte(-180).lte(180) });
export type TXubeSetDeviceLocationRequest = z.infer<typeof XubeSetDeviceLocationRequest>;
export const XubeClearDeviceLocationRequest = z.object({ device: z.string() });
export type TXubeClearDeviceLocationRequest = z.infer<typeof XubeClearDeviceLocationRequest>;
export const XubeGetDeviceVersionsRequest = z.object({ device: z.string() });
export type TXubeGetDeviceVersionsRequest = z.infer<typeof XubeGetDeviceVersionsRequest>;
export const XubeGetDeviceVersionsResponse = z.object({ versions: z.array(z.string()) });
export type TXubeGetDeviceVersionsResponse = z.infer<typeof XubeGetDeviceVersionsResponse>;
export const XubeGetDevicesRequestModelName = z.object({ devices: z.array(z.string()) });
export type TXubeGetDevicesRequestModelName = z.infer<typeof XubeGetDevicesRequestModelName>;
export const XubeDeviceModel = z.object({ generation: z.string(), creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }), entityType: z.literal("DEVICE"), description: z.string().optional(), modelType: z.literal("DEVICE-MODEL"), type: z.literal("DEVICE:MODEL"), updates: z.object({ config: z.object({ conditions: z.array(z.enum(["local", "remote"])) }).partial(), firmware: z.object({ conditions: z.array(z.enum(["local", "remote"])) }).partial() }).partial().optional(), updater: z.string().optional(), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), service: z.literal("Device"), name: z.string(), isGlobal: z.boolean().optional(), model: z.string(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), make: z.string(), config: z.object({ schema: z.object({}).partial().passthrough(), properties: z.array(z.object({ readable: z.boolean().optional(), format: z.enum(["WIFI_CREDENTIALS", "GENERAL"]).optional(), label: z.string(), value: z.string().optional(), validation: z.object({}).partial().passthrough().optional(), writable: z.boolean().optional() })) }).partial().optional() });
export type TXubeDeviceModel = z.infer<typeof XubeDeviceModel>;
export const XubeSetFirmwareVersionRequest = z.object({ firmwareVersion: z.string(), device: z.string() });
export type TXubeSetFirmwareVersionRequest = z.infer<typeof XubeSetFirmwareVersionRequest>;
export const XubeGetDeviceFacetCategoriesRequest = z.object({ facetTypes: z.array(z.string()) }).partial();
export type TXubeGetDeviceFacetCategoriesRequest = z.infer<typeof XubeGetDeviceFacetCategoriesRequest>;
export const XubeGetDeviceFacetCategoriesResponse = z.object({ data: z.record(z.object({ color: z.string().optional(), name: z.string(), icon: z.string().optional(), description: z.string(), id: z.string() })) });
export type TXubeGetDeviceFacetCategoriesResponse = z.infer<typeof XubeGetDeviceFacetCategoriesResponse>;
export const XubeResetConnectedDevicesRequest = z.object({ duration: z.number().gte(0).lte(10000).optional(), device: z.string(), targets: z.array(z.enum(["others", "all"])).min(1) });
export type TXubeResetConnectedDevicesRequest = z.infer<typeof XubeResetConnectedDevicesRequest>;
export const XubeDevicesModelName = z.array(z.object({ generation: z.string(), componentType: z.literal("DEVICE"), creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }), entityType: z.literal("DEVICE"), certificate: z.object({ certificateArn: z.string() }).partial().optional(), description: z.string().optional(), type: z.literal("DEVICE:COMPONENT"), updater: z.string().optional(), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), thingArn: z.string().optional(), service: z.literal("Device"), name: z.string().optional(), model: z.string(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), make: z.string(), modelOrigin: z.object({ versionId: z.string(), modelId: z.string() }) }).passthrough());
export type TXubeDevicesModelName = z.infer<typeof XubeDevicesModelName>;
export const XubeDeviceFirmwareUpdate = z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), approval: z.object({ created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }), state: z.enum(["approved", "denied", "pending"]), conditions: z.array(z.enum(["local", "remote"])).optional(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), updater: z.string().optional() }), entityId: z.string(), type: z.literal("DEVICE:COMPONENT:FACET:UPDATE"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("UPDATE"), service: z.string(), facetId: z.literal("FIRMWARE"), mismatch: z.record(z.object({ actual: z.string(), expected: z.string() })).optional(), name: z.string().optional(), isGlobal: z.boolean().optional(), progress: z.record(z.object({ totalSize: z.number(), lastOffset: z.number(), updated: z.string() }).partial()).optional(), id: z.string().min(3), state: z.enum(["waiting_for_device_status", "ready_to_send", "sent", "failed", "in_progress", "completed", "cancelled"]), job: z.string().optional(), conditions: z.array(z.enum(["local", "remote"])).optional(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), device: z.string(), tasks: z.array(z.object({ a: z.enum(["d", "uf", "u", "upd", "r", "cdr", "z", "a", "s", "b", "e", "k", "x", "crash", "t"]), tries: z.number().optional(), topics: z.record(z.string()).optional(), ctx: z.object({}).partial().passthrough().optional(), timeout: z.number().optional() })) });
export type TXubeDeviceFirmwareUpdate = z.infer<typeof XubeDeviceFirmwareUpdate>;
export const XubeSetDeviceUpdateRequest = z.object({ mismatch: z.record(z.object({ actual: z.object({ cv: z.number(), v: z.number() }), expected: z.object({ cv: z.number(), v: z.number() }) })).optional(), progress: z.record(z.object({ totalSize: z.number(), lastOffset: z.number(), updated: z.string() }).partial()).optional(), state: z.enum(["waiting_for_device_status", "ready_to_send", "sent", "failed", "in_progress", "completed", "cancelled"]).optional(), device: z.string() });
export type TXubeSetDeviceUpdateRequest = z.infer<typeof XubeSetDeviceUpdateRequest>;
export const XubeDeviceUpdate = z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), approval: z.object({ created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }), state: z.enum(["approved", "denied", "pending"]), conditions: z.array(z.enum(["local", "remote"])).optional(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), updater: z.string().optional() }), entityId: z.string(), type: z.literal("DEVICE:COMPONENT:FACET:UPDATE"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("UPDATE"), service: z.string(), mismatch: z.record(z.object({ actual: z.string(), expected: z.string() })).optional(), name: z.string().optional(), isGlobal: z.boolean().optional(), progress: z.record(z.object({ totalSize: z.number(), lastOffset: z.number(), updated: z.string() }).partial()).optional(), id: z.string().min(3), state: z.enum(["waiting_for_device_status", "ready_to_send", "sent", "failed", "in_progress", "completed", "cancelled"]), job: z.string().optional(), conditions: z.array(z.enum(["local", "remote"])).optional(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), device: z.string(), tasks: z.array(z.object({ a: z.enum(["d", "uf", "u", "upd", "r", "cdr", "z", "a", "s", "b", "e", "k", "x", "crash", "t"]), tries: z.number().optional(), topics: z.record(z.string()).optional(), ctx: z.object({}).partial().passthrough().optional(), timeout: z.number().optional() })) });
export type TXubeDeviceUpdate = z.infer<typeof XubeDeviceUpdate>;
export const XubeGetDeviceEventsRequest = z.object({ nextToken: z.string().optional(), limit: z.number().optional(), start: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), end: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), device: z.string(), descending: z.boolean().optional().default(false) });
export type TXubeGetDeviceEventsRequest = z.infer<typeof XubeGetDeviceEventsRequest>;
export const XubeGetDeviceEventsResponse = z.object({ data: z.array(z.object({ level: z.number(), description: z.string().optional(), message: z.string().optional(), deviceId: z.string().optional(), accountId: z.string().optional(), uninterpreted: z.boolean().optional(), deviceEventId: z.string().optional(), rawEventId: z.string().optional(), name: z.string().optional(), arguments: z.array(z.union([z.string(), z.number(), z.boolean(), z.object({  }).partial().passthrough()])).optional(), state: z.object({}).partial().passthrough().optional(), event: z.string(), category: z.string().optional(), timestamp: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }) })), nextToken: z.string().optional() });
export type TXubeGetDeviceEventsResponse = z.infer<typeof XubeGetDeviceEventsResponse>;
export const XubeVersionResponse = z.object({ version: z.string() });
export type TXubeVersionResponse = z.infer<typeof XubeVersionResponse>;
export const XubeGetDeviceFilesUploadUrlRequest = z.object({ device: z.string() });
export type TXubeGetDeviceFilesUploadUrlRequest = z.infer<typeof XubeGetDeviceFilesUploadUrlRequest>;
export const XubeGetDeviceLatestActivationStatusRequest = z.object({ device: z.string(), account: z.string() });
export type TXubeGetDeviceLatestActivationStatusRequest = z.infer<typeof XubeGetDeviceLatestActivationStatusRequest>;
export const XubeDeviceActivationStatus = z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), activationStatus: z.enum(["active", "inactive"]), entityId: z.string(), type: z.literal("DEVICE:COMPONENT:FACET:ACTIVATION-STATUS"), deviceId: z.string(), updater: z.string().optional(), accountId: z.string(), facetType: z.literal("ACTIVATION-STATUS"), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), timestamp: z.string() });
export type TXubeDeviceActivationStatus = z.infer<typeof XubeDeviceActivationStatus>;
export const XubeSetDeviceActivationStatusRequest = z.object({ activationStatus: z.enum(["active", "inactive"]), device: z.string() });
export type TXubeSetDeviceActivationStatusRequest = z.infer<typeof XubeSetDeviceActivationStatusRequest>;
export const XubeGetDeviceFilesResponse = z.object({ current: z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), orphaned: z.record(z.object({ path: z.string(), existing: z.array(z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() })).optional(), acceptance: z.object({ accepted: z.boolean(), timestamp: z.string().optional() }).optional(), active: z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() }) })).optional(), entityId: z.string(), storage: z.record(z.object({ path: z.string(), existing: z.array(z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() })).optional(), acceptance: z.object({ accepted: z.boolean(), timestamp: z.string().optional() }).optional(), active: z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() }) })).optional(), type: z.literal("DEVICE:COMPONENT:FACET:FILES"), updater: z.string().optional(), accountId: z.string().optional(), scripting: z.record(z.object({ path: z.string(), existing: z.array(z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() })).optional(), acceptance: z.object({ accepted: z.boolean(), timestamp: z.string().optional() }).optional(), active: z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() }) })).optional(), facetType: z.literal("FILES"), environment: z.object({ release: z.string(), mqttEndpoint: z.string(), region: z.string(), status: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]).optional() }), system: z.object({ firmware: z.object({ path: z.string(), existing: z.array(z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() })).optional(), acceptance: z.object({ accepted: z.boolean(), timestamp: z.string().optional() }).optional(), active: z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() }) }) }), stage: z.enum(["current", "expected", "historical"]), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), communication: z.record(z.object({ path: z.string(), existing: z.array(z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() })).optional(), acceptance: z.object({ accepted: z.boolean(), timestamp: z.string().optional() }).optional(), active: z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() }) })).optional(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), device: z.string(), config: z.record(z.object({ path: z.string(), existing: z.array(z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() })).optional(), acceptance: z.object({ accepted: z.boolean(), timestamp: z.string().optional() }).optional(), active: z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() }) })).optional(), status: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]) }), expected: z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), orphaned: z.record(z.object({ path: z.string(), existing: z.array(z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() })).optional(), acceptance: z.object({ accepted: z.boolean(), timestamp: z.string().optional() }).optional(), active: z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() }) })).optional(), entityId: z.string(), storage: z.record(z.object({ path: z.string(), existing: z.array(z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() })).optional(), acceptance: z.object({ accepted: z.boolean(), timestamp: z.string().optional() }).optional(), active: z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() }) })).optional(), type: z.literal("DEVICE:COMPONENT:FACET:FILES"), updater: z.string().optional(), accountId: z.string().optional(), scripting: z.record(z.object({ path: z.string(), existing: z.array(z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() })).optional(), acceptance: z.object({ accepted: z.boolean(), timestamp: z.string().optional() }).optional(), active: z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() }) })).optional(), facetType: z.literal("FILES"), environment: z.object({ release: z.string(), mqttEndpoint: z.string(), region: z.string(), status: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]).optional() }), system: z.object({ firmware: z.object({ path: z.string(), existing: z.array(z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() })).optional(), acceptance: z.object({ accepted: z.boolean(), timestamp: z.string().optional() }).optional(), active: z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() }) }) }), stage: z.enum(["current", "expected", "historical"]), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), communication: z.record(z.object({ path: z.string(), existing: z.array(z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() })).optional(), acceptance: z.object({ accepted: z.boolean(), timestamp: z.string().optional() }).optional(), active: z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() }) })).optional(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), device: z.string(), config: z.record(z.object({ path: z.string(), existing: z.array(z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() })).optional(), acceptance: z.object({ accepted: z.boolean(), timestamp: z.string().optional() }).optional(), active: z.object({ partition: z.string().optional(), size: z.number().optional(), checksum: z.number().optional(), version: z.string(), key: z.string() }) })).optional(), status: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]) }) }).partial();
export type TXubeGetDeviceFilesResponse = z.infer<typeof XubeGetDeviceFilesResponse>;
export const XubeGetDeviceSubscriptionsRequest = z.object({ device: z.string() });
export type TXubeGetDeviceSubscriptionsRequest = z.infer<typeof XubeGetDeviceSubscriptionsRequest>;
export const XubeGetDeviceSubscriptionsFacetWebhookWebhookFacetResponse = z.object({ delivery: z.object({ lastDeliveryAttempt: z.string().optional(), nextRetryAt: z.string().optional(), lastSuccessfulDelivery: z.string().optional(), failedAttempts: z.number().gte(0).default(0), status: z.enum(["ACTIVE", "PAUSED", "FAILED"]) }).default({"failedAttempts":0,"status":"ACTIVE"}), creator: z.string().optional(), targetId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), targetType: z.string().optional(), type: z.string().min(3).optional(), destinationId: z.string(), url: z.string(), accountId: z.string().optional(), facetType: z.string().optional(), subscriptionVariant: z.literal("FACET-WEBHOOK"), subscriptionType: z.literal("FACET"), facetId: z.string().optional(), name: z.string().optional(), destinationType: z.literal("WEBHOOK"), id: z.string().min(3) });
export type TXubeGetDeviceSubscriptionsFacetWebhookWebhookFacetResponse = z.infer<typeof XubeGetDeviceSubscriptionsFacetWebhookWebhookFacetResponse>;
export const XubeGetDeviceSubscriptionsDataWebhookWebhookDataResponse = z.object({ delivery: z.object({ lastDeliveryAttempt: z.string().optional(), nextRetryAt: z.string().optional(), lastSuccessfulDelivery: z.string().optional(), failedAttempts: z.number().gte(0).default(0), status: z.enum(["ACTIVE", "PAUSED", "FAILED"]) }).default({"failedAttempts":0,"status":"ACTIVE"}), creator: z.string().optional(), targetId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), targetType: z.string().optional(), type: z.string().min(3).optional(), destinationId: z.string(), url: z.string(), accountId: z.string().optional(), subscriptionVariant: z.literal("DATA-WEBHOOK"), subscriptionType: z.literal("DATA"), name: z.string().optional(), destinationType: z.literal("WEBHOOK"), id: z.string().min(3) });
export type TXubeGetDeviceSubscriptionsDataWebhookWebhookDataResponse = z.infer<typeof XubeGetDeviceSubscriptionsDataWebhookWebhookDataResponse>;
export const XubeGetDeviceSubscriptionsMemberWebhookWebhookMemberResponse = z.object({ delivery: z.object({ lastDeliveryAttempt: z.string().optional(), nextRetryAt: z.string().optional(), lastSuccessfulDelivery: z.string().optional(), failedAttempts: z.number().gte(0).default(0), status: z.enum(["ACTIVE", "PAUSED", "FAILED"]) }).default({"failedAttempts":0,"status":"ACTIVE"}), creator: z.string().optional(), targetId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), targetType: z.string().optional(), type: z.string().min(3).optional(), destinationId: z.string(), url: z.string(), accountId: z.string().optional(), subscriptionVariant: z.literal("MEMBER-WEBHOOK"), subscriptionType: z.literal("MEMBER"), name: z.string().optional(), destinationType: z.literal("WEBHOOK"), id: z.string().min(3) });
export type TXubeGetDeviceSubscriptionsMemberWebhookWebhookMemberResponse = z.infer<typeof XubeGetDeviceSubscriptionsMemberWebhookWebhookMemberResponse>;
export const XubeGetDeviceSubscriptionsFacetWebsocketWebsocketFacetResponse = z.object({ delivery: z.object({ lastDeliveryAttempt: z.string().optional(), nextRetryAt: z.string().optional(), lastSuccessfulDelivery: z.string().optional(), failedAttempts: z.number().gte(0).default(0), status: z.enum(["ACTIVE", "PAUSED", "FAILED"]) }).default({"failedAttempts":0,"status":"ACTIVE"}), creator: z.string().optional(), targetId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), targetType: z.string().optional(), type: z.string().min(3).optional(), destinationId: z.string(), accountId: z.string().optional(), facetType: z.string().optional(), subscriptionVariant: z.literal("FACET-WEBSOCKET"), subscriptionType: z.literal("FACET"), facetId: z.string().optional(), name: z.string().optional(), destinationType: z.literal("WEBSOCKET"), connectionId: z.string(), id: z.string().min(3) });
export type TXubeGetDeviceSubscriptionsFacetWebsocketWebsocketFacetResponse = z.infer<typeof XubeGetDeviceSubscriptionsFacetWebsocketWebsocketFacetResponse>;
export const XubeGetDeviceSubscriptionsDataWebsocketWebsocketDataResponse = z.object({ delivery: z.object({ lastDeliveryAttempt: z.string().optional(), nextRetryAt: z.string().optional(), lastSuccessfulDelivery: z.string().optional(), failedAttempts: z.number().gte(0).default(0), status: z.enum(["ACTIVE", "PAUSED", "FAILED"]) }).default({"failedAttempts":0,"status":"ACTIVE"}), creator: z.string().optional(), targetId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), targetType: z.string().optional(), type: z.string().min(3).optional(), destinationId: z.string(), accountId: z.string().optional(), subscriptionVariant: z.literal("DATA-WEBSOCKET"), subscriptionType: z.literal("DATA"), name: z.string().optional(), destinationType: z.literal("WEBSOCKET"), connectionId: z.string(), id: z.string().min(3) });
export type TXubeGetDeviceSubscriptionsDataWebsocketWebsocketDataResponse = z.infer<typeof XubeGetDeviceSubscriptionsDataWebsocketWebsocketDataResponse>;
export const XubeGetDeviceSubscriptionsMemberWebsocketWebsocketMemberResponse = z.object({ delivery: z.object({ lastDeliveryAttempt: z.string().optional(), nextRetryAt: z.string().optional(), lastSuccessfulDelivery: z.string().optional(), failedAttempts: z.number().gte(0).default(0), status: z.enum(["ACTIVE", "PAUSED", "FAILED"]) }).default({"failedAttempts":0,"status":"ACTIVE"}), creator: z.string().optional(), targetId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), targetType: z.string().optional(), type: z.string().min(3).optional(), destinationId: z.string(), accountId: z.string().optional(), subscriptionVariant: z.literal("MEMBER-WEBSOCKET"), subscriptionType: z.literal("MEMBER"), name: z.string().optional(), destinationType: z.literal("WEBSOCKET"), connectionId: z.string(), id: z.string().min(3) });
export type TXubeGetDeviceSubscriptionsMemberWebsocketWebsocketMemberResponse = z.infer<typeof XubeGetDeviceSubscriptionsMemberWebsocketWebsocketMemberResponse>;
export const XubeGetDeviceSubscriptionsResponse = z.array(
                z.discriminatedUnion("subscriptionVariant", [XubeGetDeviceSubscriptionsFacetWebhookWebhookFacetResponse, XubeGetDeviceSubscriptionsDataWebhookWebhookDataResponse, XubeGetDeviceSubscriptionsMemberWebhookWebhookMemberResponse, XubeGetDeviceSubscriptionsFacetWebsocketWebsocketFacetResponse, XubeGetDeviceSubscriptionsDataWebsocketWebsocketDataResponse, XubeGetDeviceSubscriptionsMemberWebsocketWebsocketMemberResponse])
            );
export type TXubeGetDeviceSubscriptionsResponse = z.infer<typeof XubeGetDeviceSubscriptionsResponse>;
export const XubeGetAccountDeviceEventsRequest = z.object({ minLevel: z.number().optional(), accountId: z.string(), nextToken: z.string().optional(), limit: z.number().optional(), descending: z.boolean().optional() });
export type TXubeGetAccountDeviceEventsRequest = z.infer<typeof XubeGetAccountDeviceEventsRequest>;
export const XubeGetAccountDeviceEventsResponse = z.object({ data: z.array(z.object({ level: z.number(), description: z.string().optional(), message: z.string().optional(), deviceId: z.string().optional(), accountId: z.string().optional(), uninterpreted: z.boolean().optional(), deviceEventId: z.string().optional(), rawEventId: z.string().optional(), name: z.string().optional(), arguments: z.array(z.union([z.string(), z.number(), z.boolean(), z.object({  }).partial().passthrough()])).optional(), state: z.object({}).partial().passthrough().optional(), event: z.string(), category: z.string().optional(), timestamp: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }) })), nextToken: z.string().optional() });
export type TXubeGetAccountDeviceEventsResponse = z.infer<typeof XubeGetAccountDeviceEventsResponse>;
export const XubeGetDeviceEventMappingsRequest = z.object({ deviceEventId: z.string(), deviceModelId: z.string(), deviceModelVersionId: z.string() }).partial();
export type TXubeGetDeviceEventMappingsRequest = z.infer<typeof XubeGetDeviceEventMappingsRequest>;
export const XubeGetDeviceEventMappingsResponse = z.object({ data: z.array(z.object({ mappingId: z.string(), eventCode: z.string(), deviceEventId: z.string(), deviceModelId: z.string(), deviceModelVersionId: z.string(), paramEquals: z.object({ value: z.union([z.string(), z.number(), z.boolean()]), key: z.string() }).optional() })) });
export type TXubeGetDeviceEventMappingsResponse = z.infer<typeof XubeGetDeviceEventMappingsResponse>;
export const XubeAttachDeviceEventMappingRequest = z.object({ eventCode: z.string(), deviceEventId: z.string(), deviceModelId: z.string(), deviceModelVersionId: z.string(), paramEquals: z.object({ value: z.union([z.string(), z.number(), z.boolean()]), key: z.string() }).optional() });
export type TXubeAttachDeviceEventMappingRequest = z.infer<typeof XubeAttachDeviceEventMappingRequest>;
export const XubeDeviceEventMappingResponse = z.object({ mappingId: z.string(), eventCode: z.string(), deviceEventId: z.string(), deviceModelId: z.string(), deviceModelVersionId: z.string(), paramEquals: z.object({ value: z.union([z.string(), z.number(), z.boolean()]), key: z.string() }).optional() });
export type TXubeDeviceEventMappingResponse = z.infer<typeof XubeDeviceEventMappingResponse>;
export const XubeGetDeviceModelsRequest = z.object({  }).partial();
export type TXubeGetDeviceModelsRequest = z.infer<typeof XubeGetDeviceModelsRequest>;
export const XubeGetDeviceModelsResponse = z.array(z.object({ generation: z.string(), creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }), entityType: z.literal("DEVICE"), description: z.string().optional(), modelType: z.literal("DEVICE-MODEL"), type: z.literal("DEVICE:MODEL"), updates: z.object({ config: z.object({ conditions: z.array(z.enum(["local", "remote"])) }).partial(), firmware: z.object({ conditions: z.array(z.enum(["local", "remote"])) }).partial() }).partial().optional(), updater: z.string().optional(), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), service: z.literal("Device"), name: z.string(), isGlobal: z.boolean().optional(), model: z.string(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), make: z.string(), config: z.object({ schema: z.object({}).partial().passthrough(), properties: z.array(z.object({ readable: z.boolean().optional(), format: z.enum(["WIFI_CREDENTIALS", "GENERAL"]).optional(), label: z.string(), value: z.string().optional(), validation: z.object({}).partial().passthrough().optional(), writable: z.boolean().optional() })) }).partial().optional() }));
export type TXubeGetDeviceModelsResponse = z.infer<typeof XubeGetDeviceModelsResponse>;
export const XubeDeleteCanonicalDeviceEventRequest = z.object({ deviceEventId: z.string() });
export type TXubeDeleteCanonicalDeviceEventRequest = z.infer<typeof XubeDeleteCanonicalDeviceEventRequest>;
export const XubeUpdateCanonicalDeviceEventRequest = z.object({ level: z.union([z.literal(100), z.literal(200), z.literal(300), z.literal(400), z.literal(500), z.literal(600)]).optional(), deviceEventId: z.string(), name: z.string().optional(), description: z.string().optional(), category: z.string().optional() });
export type TXubeUpdateCanonicalDeviceEventRequest = z.infer<typeof XubeUpdateCanonicalDeviceEventRequest>;
export const XubeGetDevicesFacetsRequest = z.object({ devices: z.array(z.string()).min(1).max(100), facetTypes: z.array(z.string()).optional() });
export type TXubeGetDevicesFacetsRequest = z.infer<typeof XubeGetDevicesFacetsRequest>;
export const XubeGetDevicesFacetsResponse = z.object({ data: z.array(z.object({ component: z.object({ generation: z.string(), componentType: z.literal("DEVICE"), creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }), entityType: z.literal("DEVICE"), certificate: z.object({ certificateArn: z.string() }).partial().optional(), description: z.string().optional(), type: z.literal("DEVICE:COMPONENT"), updater: z.string().optional(), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), thingArn: z.string().optional(), service: z.literal("Device"), name: z.string().optional(), model: z.string(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), make: z.string(), modelOrigin: z.object({ versionId: z.string(), modelId: z.string() }) }).passthrough(), facets: z.array(z.object({ accountId: z.string().optional(), creator: z.string().optional(), facetType: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), entityId: z.string(), id: z.string().min(3), type: z.string().min(3).optional(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), updater: z.string().optional() }).passthrough()) })) });
export type TXubeGetDevicesFacetsResponse = z.infer<typeof XubeGetDevicesFacetsResponse>;
export const XubeGetDevicesHeartbeatsRequest = z.object({ devices: z.array(z.string()) });
export type TXubeGetDevicesHeartbeatsRequest = z.infer<typeof XubeGetDevicesHeartbeatsRequest>;
export const XubeGetDevicesHeartbeatsResponse = z.array(z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("DEVICE:COMPONENT:FACET:HEARTBEAT"), deviceId: z.string(), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("HEARTBEAT"), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), SK: z.string(), id: z.string().min(3), PK: z.string(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), timestamp: z.string() }).passthrough());
export type TXubeGetDevicesHeartbeatsResponse = z.infer<typeof XubeGetDevicesHeartbeatsResponse>;
export const XubeAccountDevicesRequest = z.object({ nextToken: z.string().optional(), limit: z.number().optional(), account: z.string(), descending: z.boolean().optional().default(false) });
export type TXubeAccountDevicesRequest = z.infer<typeof XubeAccountDevicesRequest>;
export const XubeAccountDevices = z.object({ data: z.array(z.object({ accountId: z.string(), creator: z.string().optional(), facetType: z.literal("ACCOUNT"), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), entityId: z.string(), id: z.string().min(3), type: z.literal("ENTITY:ENTITY:FACET:ACCOUNT"), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), updater: z.string().optional() })), nextToken: z.string().optional() });
export type TXubeAccountDevices = z.infer<typeof XubeAccountDevices>;
export const XubeGetDeviceFacetTypesRequest = z.object({  }).partial();
export type TXubeGetDeviceFacetTypesRequest = z.infer<typeof XubeGetDeviceFacetTypesRequest>;
export const XubeGetDeviceFacetTypesResponse = z.object({ data: z.record(z.object({ facetTypes: z.record(z.object({ name: z.string(), description: z.string() })), name: z.string(), description: z.string() })) });
export type TXubeGetDeviceFacetTypesResponse = z.infer<typeof XubeGetDeviceFacetTypesResponse>;
export const XubeGetDeviceVersionDownloadUrlRequest = z.object({ device: z.string(), version: z.string() });
export type TXubeGetDeviceVersionDownloadUrlRequest = z.infer<typeof XubeGetDeviceVersionDownloadUrlRequest>;
export const XubeDeviceAccount = z.object({ accountId: z.string(), creator: z.string().optional(), facetType: z.literal("ACCOUNT"), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), entityId: z.string(), id: z.string().min(3), type: z.literal("ENTITY:ENTITY:FACET:ACCOUNT"), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), updater: z.string().optional() });
export type TXubeDeviceAccount = z.infer<typeof XubeDeviceAccount>;
export const XubeDeviceStatus = z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), availability: z.object({ lastSeenAt: z.string().optional(), lastReportedAt: z.string().optional(), state: z.enum(["online", "offline", "unknown"]), updated: z.string() }).optional(), type: z.literal("DEVICE:COMPONENT:FACET:STATUS"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.string(), connectivity: z.object({ wifi: z.object({ signalStrength: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.number().optional() }).optional(), connection: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.enum(["connected", "notConnected", "notInUse", "pending"]) }), ssid: z.string().optional() }), cellular: z.object({ signalStrength: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.number().optional() }).optional(), connection: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.enum(["connected", "notConnected", "notInUse", "pending"]) }) }), eth: z.object({ connection: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.enum(["connected", "notConnected", "notInUse", "pending"]) }), mac: z.string().optional() }), platform: z.object({ connection: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.enum(["connected", "notConnected", "notInUse", "pending"]) }) }) }).partial(), engine: z.object({ state: z.enum(["running", "stopped", "error", "unknown"]), updated: z.string() }).optional(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), temperature: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.number() }).optional(), id: z.string().min(3), power: z.object({ auxiliary: z.object({ connection: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.enum(["connected", "notConnected", "notInUse", "pending"]) }), voltage: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.number().optional() }).optional() }).optional(), usb: z.object({ connection: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.enum(["connected", "notConnected", "notInUse", "pending"]) }), voltage: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.number().optional() }).optional() }).optional(), solar: z.object({ connection: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.enum(["connected", "notConnected", "notInUse", "pending"]) }), voltage: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.number().optional() }).optional() }).optional(), source: z.object({ currentSource: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.enum(["battery", "usb", "solar", "auxiliary", "noSource", "unknownSource"]) }) }), battery: z.object({ charge: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.number() }), temperature: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.number() }).optional(), chargingState: z.enum(["charging", "notCharging", "unknown"]) }).optional() }), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), timestamp: z.string() });
export type TXubeDeviceStatus = z.infer<typeof XubeDeviceStatus>;
export const XubePushHandlerRequest = z.object({ changes: z.array(z.object({ assumedMasterState: z.object({  }).partial().passthrough().optional(), newForkState: z.object({  }).partial().passthrough() })) });
export type TXubePushHandlerRequest = z.infer<typeof XubePushHandlerRequest>;
export const XubePushHandlerResponse = z.object({ pushErrors: z.array(z.object({ index: z.number(), message: z.string() })).default([]), conflicts: z.array(z.object({  }).partial().passthrough()).default([]) });
export type TXubePushHandlerResponse = z.infer<typeof XubePushHandlerResponse>;
export const XubeCopyDeviceConfigRequest = z.object({ sourceDeviceId: z.string(), targetDeviceIds: z.array(z.string()) });
export type TXubeCopyDeviceConfigRequest = z.infer<typeof XubeCopyDeviceConfigRequest>;
export const XubeGetLatestDeviceHeartbeatRequest = z.object({ device: z.string() });
export type TXubeGetLatestDeviceHeartbeatRequest = z.infer<typeof XubeGetLatestDeviceHeartbeatRequest>;
export const XubeGetLatestDeviceHeartbeatResponse = z.object({ deviceId: z.string(), timestamp: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }) });
export type TXubeGetLatestDeviceHeartbeatResponse = z.infer<typeof XubeGetLatestDeviceHeartbeatResponse>;
export const XubeGetDestinationDevicesRequest = z.object({ nextToken: z.string().optional(), destination: z.string(), limit: z.number().optional(), descending: z.boolean().optional() });
export type TXubeGetDestinationDevicesRequest = z.infer<typeof XubeGetDestinationDevicesRequest>;
export const XubeDestinationDevices = z.object({ devices: z.array(z.string()), nextToken: z.string().optional() });
export type TXubeDestinationDevices = z.infer<typeof XubeDestinationDevices>;
export const XubeGetDevicesStatusRequestModelName = z.object({ devices: z.array(z.string()) });
export type TXubeGetDevicesStatusRequestModelName = z.infer<typeof XubeGetDevicesStatusRequestModelName>;
export const XubeDevicesStatusModelName = z.record(z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), availability: z.object({ lastSeenAt: z.string().optional(), lastReportedAt: z.string().optional(), state: z.enum(["online", "offline", "unknown"]), updated: z.string() }).optional(), type: z.literal("DEVICE:COMPONENT:FACET:STATUS"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.string(), connectivity: z.object({ wifi: z.object({ signalStrength: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.number().optional() }).optional(), connection: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.enum(["connected", "notConnected", "notInUse", "pending"]) }), ssid: z.string().optional() }), cellular: z.object({ signalStrength: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.number().optional() }).optional(), connection: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.enum(["connected", "notConnected", "notInUse", "pending"]) }) }), eth: z.object({ connection: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.enum(["connected", "notConnected", "notInUse", "pending"]) }), mac: z.string().optional() }), platform: z.object({ connection: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.enum(["connected", "notConnected", "notInUse", "pending"]) }) }) }).partial(), engine: z.object({ state: z.enum(["running", "stopped", "error", "unknown"]), updated: z.string() }).optional(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), temperature: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.number() }).optional(), id: z.string().min(3), power: z.object({ auxiliary: z.object({ connection: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.enum(["connected", "notConnected", "notInUse", "pending"]) }), voltage: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.number().optional() }).optional() }).optional(), usb: z.object({ connection: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.enum(["connected", "notConnected", "notInUse", "pending"]) }), voltage: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.number().optional() }).optional() }).optional(), solar: z.object({ connection: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.enum(["connected", "notConnected", "notInUse", "pending"]) }), voltage: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.number().optional() }).optional() }).optional(), source: z.object({ currentSource: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.enum(["battery", "usb", "solar", "auxiliary", "noSource", "unknownSource"]) }) }), battery: z.object({ charge: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.number() }), temperature: z.object({ state: z.enum(["disabled", "pending", "unknown", "error", "warning", "healthy"]), message: z.string().optional(), updated: z.string(), value: z.number() }).optional(), chargingState: z.enum(["charging", "notCharging", "unknown"]) }).optional() }), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), timestamp: z.string() }));
export type TXubeDevicesStatusModelName = z.infer<typeof XubeDevicesStatusModelName>;
export const XubeGetDeviceHeartbeatsRequest = z.object({ nextToken: z.string().optional(), limit: z.number().optional(), start: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), end: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), device: z.string(), descending: z.boolean().optional().default(false) });
export type TXubeGetDeviceHeartbeatsRequest = z.infer<typeof XubeGetDeviceHeartbeatsRequest>;
export const XubeGetDeviceHeartbeatsResponse = z.object({ data: z.array(z.object({ deviceId: z.string(), timestamp: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }) })), nextToken: z.string().optional() });
export type TXubeGetDeviceHeartbeatsResponse = z.infer<typeof XubeGetDeviceHeartbeatsResponse>;
export const XubeNever = z.object({}).partial().passthrough();
export type TXubeNever = z.infer<typeof XubeNever>;
export const XubeString = z.string();
export type TXubeString = z.infer<typeof XubeString>;
export const XubeGrowExtendableSetRequest = z.object({ componentId: z.string(), extendableSetId: z.string() });
export type TXubeGrowExtendableSetRequest = z.infer<typeof XubeGrowExtendableSetRequest>;
export const XubeGrowShrinkResponse = z.object({ componentId: z.string(), childEntryId: z.string() });
export type TXubeGrowShrinkResponse = z.infer<typeof XubeGrowShrinkResponse>;
export const XubeGetModelManifestRequest = z.object({ childModelId: z.string().optional(), versionId: z.string(), modelId: z.string(), childEntryId: z.string().optional(), childVersionId: z.string().optional() });
export type TXubeGetModelManifestRequest = z.infer<typeof XubeGetModelManifestRequest>;
export const XubeModelManifest = z.object({ childModelId: z.string().optional(), creator: z.string().optional(), modelId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("ENTITY:MODEL:FACET:MANIFEST"), childVersionId: z.string().optional(), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("MANIFEST"), versionId: z.string(), entries: z.array(z.object({ ref: z.string().optional(), inline: z.object({}).partial().passthrough().optional(), kind: z.string(), checksum: z.string().optional(), placeholders: z.array(z.string()).optional(), contentType: z.string().optional() })), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), childEntryId: z.string().optional(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubeModelManifest = z.infer<typeof XubeModelManifest>;
export const XubeSetModelManifestRequest = z.object({ childModelId: z.string().optional(), versionId: z.string(), entries: z.array(z.object({ ref: z.string().optional(), inline: z.object({}).partial().passthrough().optional(), kind: z.string(), checksum: z.string().optional(), placeholders: z.array(z.string()).optional(), contentType: z.string().optional() })), modelId: z.string(), childEntryId: z.string().optional(), id: z.string().optional(), childVersionId: z.string().optional() });
export type TXubeSetModelManifestRequest = z.infer<typeof XubeSetModelManifestRequest>;
export const XubeDeleteModelManifestRequest = z.object({ childModelId: z.string().optional(), versionId: z.string(), modelId: z.string(), childEntryId: z.string().optional(), childVersionId: z.string().optional() });
export type TXubeDeleteModelManifestRequest = z.infer<typeof XubeDeleteModelManifestRequest>;
export const XubeAddPropertyCategoryRequest = z.object({ category: z.string().min(1), propertyId: z.string() });
export type TXubeAddPropertyCategoryRequest = z.infer<typeof XubeAddPropertyCategoryRequest>;
export const XubePropertyCategoryFacet = z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("ENTITY:ENTITY:FACET:CATEGORY"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("CATEGORY"), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), category: z.string(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubePropertyCategoryFacet = z.infer<typeof XubePropertyCategoryFacet>;
export const XubeRemovePropertyCategoryRequest = z.object({ category: z.string().min(1), propertyId: z.string() });
export type TXubeRemovePropertyCategoryRequest = z.infer<typeof XubeRemovePropertyCategoryRequest>;
export const XubeRemoveComponentChildRequest = z.object({ componentId: z.string(), childId: z.string() });
export type TXubeRemoveComponentChildRequest = z.infer<typeof XubeRemoveComponentChildRequest>;
export const XubeMaterialiseComponentRequest = z.object({ componentId: z.string() });
export type TXubeMaterialiseComponentRequest = z.infer<typeof XubeMaterialiseComponentRequest>;
export const XubeMaterialiseComponentResponse = z.object({ createdConnections: z.number(), createdComponents: z.number() });
export type TXubeMaterialiseComponentResponse = z.infer<typeof XubeMaterialiseComponentResponse>;
export const XubeListPropertyVersionsRequest = z.object({ propertyId: z.string() });
export type TXubeListPropertyVersionsRequest = z.infer<typeof XubeListPropertyVersionsRequest>;
export const XubePropertyVersions = z.array(z.object({ schema: z.object({}).partial().passthrough(), instructions: z.string().optional(), creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), description: z.string().optional(), changelog: z.array(z.string()).optional(), entityId: z.string(), type: z.literal("ENTITY:PROPERTY:VERSION"), updater: z.string().optional(), lifecycle: z.enum(["DRAFT", "ACTIVE", "INACTIVE"]), accountId: z.string().optional(), facetType: z.literal("VERSION"), versionId: z.string(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), sensitivity: z.enum(["PUBLIC", "SECRET", "RESTRICTED"]).default("PUBLIC"), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), propertyId: z.string(), allowedEntities: z.array(z.string()).optional() }));
export type TXubePropertyVersions = z.infer<typeof XubePropertyVersions>;
export const XubeCreatePropertyVersionRequest = z.object({ schema: z.object({}).partial().passthrough(), instructions: z.string().optional(), versionId: z.string().optional(), name: z.string().optional(), description: z.string().optional(), changelog: z.array(z.string()).optional(), id: z.string().optional(), sensitivity: z.enum(["PUBLIC", "SECRET", "RESTRICTED"]), propertyId: z.string(), allowedEntities: z.array(z.string().regex(/^[A-Z][A-Z0-9-]*$/)).optional() });
export type TXubeCreatePropertyVersionRequest = z.infer<typeof XubeCreatePropertyVersionRequest>;
export const XubePropertyVersion = z.object({ schema: z.object({}).partial().passthrough(), instructions: z.string().optional(), creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), description: z.string().optional(), changelog: z.array(z.string()).optional(), entityId: z.string(), type: z.literal("ENTITY:PROPERTY:VERSION"), updater: z.string().optional(), lifecycle: z.enum(["DRAFT", "ACTIVE", "INACTIVE"]), accountId: z.string().optional(), facetType: z.literal("VERSION"), versionId: z.string(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), sensitivity: z.enum(["PUBLIC", "SECRET", "RESTRICTED"]).default("PUBLIC"), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), propertyId: z.string(), allowedEntities: z.array(z.string()).optional() });
export type TXubePropertyVersion = z.infer<typeof XubePropertyVersion>;
export const XubeListModelCategoriesRequest = z.object({ modelId: z.string() });
export type TXubeListModelCategoriesRequest = z.infer<typeof XubeListModelCategoriesRequest>;
export const XubeEntityCategories = z.array(z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("ENTITY:ENTITY:FACET:CATEGORY"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("CATEGORY"), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), category: z.string(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() }));
export type TXubeEntityCategories = z.infer<typeof XubeEntityCategories>;
export const XubeListPropertiesByCategoryRequest = z.object({ accountId: z.string().optional(), nextToken: z.string().optional(), isGlobal: z.boolean().optional(), limit: z.number().int().gte(1).lte(9007199254740991).optional(), category: z.string().min(1) });
export type TXubeListPropertiesByCategoryRequest = z.infer<typeof XubeListPropertiesByCategoryRequest>;
export const XubePropertiesByCategory = z.object({ data: z.array(z.object({ instructions: z.string().optional(), creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), description: z.string().optional(), type: z.literal("ENTITY:PROPERTY"), updater: z.string().optional(), accountId: z.string().optional(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), configurability: z.enum(["INHERENT", "IMMUTABLE", "CONFIGURABLE", "DERIVED"]).default("CONFIGURABLE"), id: z.string().min(3), sensitivity: z.enum(["PUBLIC", "SECRET", "RESTRICTED"]).optional(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), allowedEntities: z.array(z.string()).optional(), slug: z.string().optional() })), nextToken: z.string().optional() });
export type TXubePropertiesByCategory = z.infer<typeof XubePropertiesByCategory>;
export const XubeGetModelCompatibilityRequest = z.object({ versionId: z.string(), modelId: z.string() });
export type TXubeGetModelCompatibilityRequest = z.infer<typeof XubeGetModelCompatibilityRequest>;
export const XubeCompatibilityFacets = z.array(z.object({ creator: z.string().optional(), modelId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("ENTITY:ENTITY:FACET:COMPATIBILITY"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("COMPATIBILITY"), versionId: z.string(), compatibleModelId: z.string(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() }));
export type TXubeCompatibilityFacets = z.infer<typeof XubeCompatibilityFacets>;
export const XubeAddComponentCategoryRequest = z.object({ componentId: z.string(), category: z.string().min(1) });
export type TXubeAddComponentCategoryRequest = z.infer<typeof XubeAddComponentCategoryRequest>;
export const XubeComponentCategoryFacet = z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("ENTITY:ENTITY:FACET:CATEGORY"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("CATEGORY"), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), category: z.string(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubeComponentCategoryFacet = z.infer<typeof XubeComponentCategoryFacet>;
export const XubeRemoveComponentCategoryRequest = z.object({ componentId: z.string(), category: z.string().min(1) });
export type TXubeRemoveComponentCategoryRequest = z.infer<typeof XubeRemoveComponentCategoryRequest>;
export const XubeListModelConnectionsRequest = z.object({ versionId: z.string(), modelId: z.string() });
export type TXubeListModelConnectionsRequest = z.infer<typeof XubeListModelConnectionsRequest>;
export const XubeModelConnections = z.array(z.object({ peerId: z.string(), childModelId: z.string().optional(), peerChildEntryId: z.string(), peerChildPath: z.array(z.string()).optional(), attachRule: z.enum(["ANCHOR", "PREVIOUS"]).optional(), type: z.literal("ENTITY:MODEL:FACET:CONNECTION"), childVersionId: z.string().optional(), updater: z.string().optional(), interfaceType: z.string().optional(), facetType: z.literal("CONNECTION"), connectorChildEntryId: z.string().optional(), peerConnectorChildEntryId: z.string().optional(), id: z.string().min(3), childEntryId: z.string(), creator: z.string().optional(), parentModelId: z.string(), continuationConnectorChildEntryId: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), childPath: z.array(z.string()).optional(), accountId: z.string().optional(), versionId: z.string(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), cableEntryId: z.string().optional(), connectionId: z.string(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() }));
export type TXubeModelConnections = z.infer<typeof XubeModelConnections>;
export const XubeCreateModelConnectionRequest = z.object({ interfaceType: z.string().optional(), versionId: z.string(), modelId: z.string(), children: z.array(z.union([z.object({ childPath: z.array(z.string()).min(1).optional(), connectorChildEntryId: z.string().optional(), childEntryId: z.string() }), z.object({ childPath: z.array(z.string()).min(1).optional(), connectorChildEntryId: z.string().optional(), childEntryId: z.string() })])).min(2).max(2), continuationConnectorChildEntryId: z.string().optional(), cableEntryId: z.string().optional(), connectionId: z.string().optional(), attachRule: z.enum(["ANCHOR", "PREVIOUS"]).optional() });
export type TXubeCreateModelConnectionRequest = z.infer<typeof XubeCreateModelConnectionRequest>;
export const XubeModelConnection = z.object({ peerId: z.string(), childModelId: z.string().optional(), peerChildEntryId: z.string(), peerChildPath: z.array(z.string()).optional(), attachRule: z.enum(["ANCHOR", "PREVIOUS"]).optional(), type: z.literal("ENTITY:MODEL:FACET:CONNECTION"), childVersionId: z.string().optional(), updater: z.string().optional(), interfaceType: z.string().optional(), facetType: z.literal("CONNECTION"), connectorChildEntryId: z.string().optional(), peerConnectorChildEntryId: z.string().optional(), id: z.string().min(3), childEntryId: z.string(), creator: z.string().optional(), parentModelId: z.string(), continuationConnectorChildEntryId: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), childPath: z.array(z.string()).optional(), accountId: z.string().optional(), versionId: z.string(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), cableEntryId: z.string().optional(), connectionId: z.string(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubeModelConnection = z.infer<typeof XubeModelConnection>;
export const XubeGetModelMediaUploadUrlRequest = z.object({ slots: z.array(z.object({ extension: z.string().min(1).max(8).regex(/^[a-z0-9]+$/), slot: z.enum(["image", "thumbnail"]), contentType: z.string().min(1) })).min(1).max(2), modelId: z.string() });
export type TXubeGetModelMediaUploadUrlRequest = z.infer<typeof XubeGetModelMediaUploadUrlRequest>;
export const XubeModelMediaUploadUrl = z.object({ targets: z.array(z.object({ uploadUrl: z.string(), slot: z.enum(["image", "thumbnail"]), key: z.string(), url: z.string() })) });
export type TXubeModelMediaUploadUrl = z.infer<typeof XubeModelMediaUploadUrl>;
export const XubePublishVersionRequest = z.object({ versionId: z.string(), modelId: z.string() });
export type TXubePublishVersionRequest = z.infer<typeof XubePublishVersionRequest>;
export const XubeModelVersion = z.object({ creator: z.string().optional(), allowsCyclicalChildConnections: z.boolean().optional(), modelId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), cloneFrom: z.string().optional(), description: z.string().optional(), changelog: z.array(z.string()).optional(), type: z.string(), updater: z.string().optional(), lifecycle: z.enum(["DRAFT", "ACTIVE", "INACTIVE"]), accountId: z.string().optional(), versionId: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubeModelVersion = z.infer<typeof XubeModelVersion>;
export const XubeGetComponentPropertyRequest = z.object({ componentId: z.string(), propertyId: z.string() });
export type TXubeGetComponentPropertyRequest = z.infer<typeof XubeGetComponentPropertyRequest>;
export const XubeComponentProperty = z.object({ creator: z.string().optional(), componentId: z.string(), instance: z.object({ revisionId: z.string(), instanceId: z.string() }), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), origin: z.object({ versionId: z.string(), modelId: z.string(), modelPropertyId: z.string() }), entityId: z.string(), type: z.literal("ENTITY:COMPONENT:FACET:PROPERTY"), importEntryId: z.string().optional(), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("PROPERTY"), importId: z.string().optional(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), propertyId: z.string(), value: z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())])), z.record(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())]))])), z.record(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())])), z.record(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())]))]))])), z.record(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())])), z.record(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())]))])), z.record(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())])), z.record(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())]))]))]))]) });
export type TXubeComponentProperty = z.infer<typeof XubeComponentProperty>;
export const XubeDeleteCompatibilityFacetRequest = z.object({ versionId: z.string(), compatibleModelId: z.string(), modelId: z.string() });
export type TXubeDeleteCompatibilityFacetRequest = z.infer<typeof XubeDeleteCompatibilityFacetRequest>;
export const XubeListModelPropertiesRequest = z.object({ versionId: z.string(), modelId: z.string() });
export type TXubeListModelPropertiesRequest = z.infer<typeof XubeListModelPropertiesRequest>;
export const XubeModelProperties = z.array(z.object({ schema: z.object({}).partial().passthrough(), creator: z.string().optional(), modelId: z.string(), instances: z.object({ default: z.number().int().gte(-9007199254740991).lte(9007199254740991), min: z.number().int().gte(-9007199254740991).lte(9007199254740991), max: z.number().int().gte(-9007199254740991).lte(9007199254740991) }).partial().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("ENTITY:MODEL:FACET:PROPERTY"), required: z.boolean().default(false), searchable: z.boolean().default(false), updater: z.string().optional(), modelPropertyId: z.string(), accountId: z.string().optional(), facetType: z.literal("PROPERTY"), versionId: z.string(), default: z.object({}).partial().passthrough().optional(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), property: z.object({ versionId: z.string(), propertyId: z.string() }), configurability: z.enum(["INHERENT", "IMMUTABLE", "CONFIGURABLE", "DERIVED"]), scopeCeiling: z.enum(["SELF", "DEVICE", "ENCLOSURE", "SYSTEM", "SITE", "ACCOUNT"]).optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), value: z.object({}).partial().passthrough().optional() }));
export type TXubeModelProperties = z.infer<typeof XubeModelProperties>;
export const XubeAttachModelPropertyRequest = z.object({ schema: z.object({}).partial().passthrough(), modelId: z.string(), instances: z.object({ default: z.number().int().gte(-9007199254740991).lte(9007199254740991), min: z.number().int().gte(-9007199254740991).lte(9007199254740991), max: z.number().int().gte(-9007199254740991).lte(9007199254740991) }).partial().optional(), required: z.boolean().optional(), searchable: z.boolean().optional(), modelPropertyId: z.string().optional(), versionId: z.string(), default: z.object({}).partial().passthrough().optional(), configurability: z.enum(["INHERENT", "IMMUTABLE", "CONFIGURABLE", "DERIVED"]), scopeCeiling: z.enum(["SELF", "DEVICE", "ENCLOSURE", "SYSTEM", "SITE", "ACCOUNT"]).optional(), id: z.string().optional(), propertyId: z.object({ versionId: z.string(), propertyId: z.string() }), value: z.object({}).partial().passthrough().optional() });
export type TXubeAttachModelPropertyRequest = z.infer<typeof XubeAttachModelPropertyRequest>;
export const XubeModelProperty = z.object({ schema: z.object({}).partial().passthrough(), creator: z.string().optional(), modelId: z.string(), instances: z.object({ default: z.number().int().gte(-9007199254740991).lte(9007199254740991), min: z.number().int().gte(-9007199254740991).lte(9007199254740991), max: z.number().int().gte(-9007199254740991).lte(9007199254740991) }).partial().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("ENTITY:MODEL:FACET:PROPERTY"), required: z.boolean().default(false), searchable: z.boolean().default(false), updater: z.string().optional(), modelPropertyId: z.string(), accountId: z.string().optional(), facetType: z.literal("PROPERTY"), versionId: z.string(), default: z.object({}).partial().passthrough().optional(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), property: z.object({ versionId: z.string(), propertyId: z.string() }), configurability: z.enum(["INHERENT", "IMMUTABLE", "CONFIGURABLE", "DERIVED"]), scopeCeiling: z.enum(["SELF", "DEVICE", "ENCLOSURE", "SYSTEM", "SITE", "ACCOUNT"]).optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), value: z.object({}).partial().passthrough().optional() });
export type TXubeModelProperty = z.infer<typeof XubeModelProperty>;
export const XubeReactivateVersionRequest = z.object({ versionId: z.string(), modelId: z.string() });
export type TXubeReactivateVersionRequest = z.infer<typeof XubeReactivateVersionRequest>;
export const XubeDeleteMountingFacetRequest = z.object({ versionId: z.string(), exposure: z.enum(["INTERNAL", "EXTERNAL", "BOUNDARY"]), modelId: z.string() });
export type TXubeDeleteMountingFacetRequest = z.infer<typeof XubeDeleteMountingFacetRequest>;
export const XubeUpdateMountingFacetRequest = z.object({ instructions: z.string(), versionId: z.string(), exposure: z.enum(["INTERNAL", "EXTERNAL", "BOUNDARY"]), modelId: z.string() });
export type TXubeUpdateMountingFacetRequest = z.infer<typeof XubeUpdateMountingFacetRequest>;
export const XubeMountingFacet = z.object({ instructions: z.string().optional(), creator: z.string().optional(), modelId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("ENTITY:ENTITY:FACET:MOUNTING"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("MOUNTING"), versionId: z.string(), exposure: z.enum(["INTERNAL", "EXTERNAL", "BOUNDARY"]), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubeMountingFacet = z.infer<typeof XubeMountingFacet>;
export const XubeListModelPartsRequest = z.object({ accountId: z.string(), nextToken: z.string(), isGlobal: z.boolean(), limit: z.number().int().gte(1).lte(9007199254740991), modelType: z.string() }).partial();
export type TXubeListModelPartsRequest = z.infer<typeof XubeListModelPartsRequest>;
export const XubeModelParts = z.object({ data: z.array(z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityType: z.string(), description: z.string().optional(), modelType: z.string(), type: z.string(), updater: z.string().optional(), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), service: z.string().optional(), name: z.string().optional(), isGlobal: z.boolean().optional(), derivedFrom: z.object({ versionId: z.string(), modelId: z.string() }).optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() })), nextToken: z.string().optional() });
export type TXubeModelParts = z.infer<typeof XubeModelParts>;
export const XubeDeactivateComponentRequest = z.object({ componentId: z.string() });
export type TXubeDeactivateComponentRequest = z.infer<typeof XubeDeactivateComponentRequest>;
export const XubeComponent1 = z.object({ componentType: z.string(), creator: z.string().optional(), serialNumber: z.string().optional(), allowsCyclicalChildConnections: z.boolean().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityType: z.string(), description: z.string().optional(), type: z.string(), updater: z.string().optional(), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), service: z.string().optional(), name: z.string().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), modelOrigin: z.object({ versionId: z.string(), modelId: z.string() }), slug: z.string().optional() });
export type TXubeComponent1 = z.infer<typeof XubeComponent1>;
export const XubeSetPropertySlugRequest = z.object({ propertyId: z.string(), slug: z.string() });
export type TXubeSetPropertySlugRequest = z.infer<typeof XubeSetPropertySlugRequest>;
export const XubePropertySlugFacet = z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("ENTITY:ENTITY:FACET:SLUG"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("SLUG"), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), slug: z.string() });
export type TXubePropertySlugFacet = z.infer<typeof XubePropertySlugFacet>;
export const XubeDeletePropertySlugRequest = z.object({ propertyId: z.string() });
export type TXubeDeletePropertySlugRequest = z.infer<typeof XubeDeletePropertySlugRequest>;
export const XubeGetComponentRequest1 = z.object({ componentId: z.string() });
export type TXubeGetComponentRequest1 = z.infer<typeof XubeGetComponentRequest1>;
export const XubeUpdateComponentRequest = z.object({ lifecycle: z.enum(["ACTIVE", "INACTIVE"]).optional(), componentId: z.string(), serialNumber: z.string().optional(), name: z.string().optional(), description: z.string().optional() });
export type TXubeUpdateComponentRequest = z.infer<typeof XubeUpdateComponentRequest>;
export const XubeDeprecateVersionRequest = z.object({ versionId: z.string(), modelId: z.string() });
export type TXubeDeprecateVersionRequest = z.infer<typeof XubeDeprecateVersionRequest>;
export const XubeAddModelCategoryRequest = z.object({ modelId: z.string(), category: z.string().min(1) });
export type TXubeAddModelCategoryRequest = z.infer<typeof XubeAddModelCategoryRequest>;
export const XubeModelCategoryFacet = z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("ENTITY:ENTITY:FACET:CATEGORY"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("CATEGORY"), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), category: z.string(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubeModelCategoryFacet = z.infer<typeof XubeModelCategoryFacet>;
export const XubeRemoveModelCategoryRequest = z.object({ modelId: z.string(), category: z.string().min(1) });
export type TXubeRemoveModelCategoryRequest = z.infer<typeof XubeRemoveModelCategoryRequest>;
export const XubeListPropertyCategoriesRequest = z.object({ propertyId: z.string() });
export type TXubeListPropertyCategoriesRequest = z.infer<typeof XubeListPropertyCategoriesRequest>;
export const XubeGetPropertyRequest = z.object({ propertyId: z.string() });
export type TXubeGetPropertyRequest = z.infer<typeof XubeGetPropertyRequest>;
export const XubeProperty = z.object({ instructions: z.string().optional(), creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), description: z.string().optional(), type: z.literal("ENTITY:PROPERTY"), updater: z.string().optional(), accountId: z.string().optional(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), configurability: z.enum(["INHERENT", "IMMUTABLE", "CONFIGURABLE", "DERIVED"]).default("CONFIGURABLE"), id: z.string().min(3), sensitivity: z.enum(["PUBLIC", "SECRET", "RESTRICTED"]).optional(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), allowedEntities: z.array(z.string()).optional(), slug: z.string().optional() });
export type TXubeProperty = z.infer<typeof XubeProperty>;
export const XubeDeletePropertyRequest = z.object({ propertyId: z.string() });
export type TXubeDeletePropertyRequest = z.infer<typeof XubeDeletePropertyRequest>;
export const XubeUpdatePropertyRequest = z.object({ instructions: z.string().optional(), name: z.string().optional(), description: z.string().optional(), configurability: z.enum(["INHERENT", "IMMUTABLE", "CONFIGURABLE", "DERIVED"]).optional(), sensitivity: z.enum(["PUBLIC", "SECRET", "RESTRICTED"]).optional(), propertyId: z.string(), allowedEntities: z.array(z.string().regex(/^[A-Z][A-Z0-9-]*$/)).optional() });
export type TXubeUpdatePropertyRequest = z.infer<typeof XubeUpdatePropertyRequest>;
export const XubeListModelConnectionPropertiesRequest = z.object({ versionId: z.string(), modelId: z.string(), connectionId: z.string(), childId: z.string() });
export type TXubeListModelConnectionPropertiesRequest = z.infer<typeof XubeListModelConnectionPropertiesRequest>;
export const XubeModelConnectionProperties = z.array(z.object({ childModelId: z.string().optional(), creator: z.string().optional(), parentModelId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("ENTITY:MODEL:FACET:CONNECTION-PROPERTY"), childVersionId: z.string().optional(), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("CONNECTION-PROPERTY"), versionId: z.string(), instanceId: z.string(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), connectionId: z.string(), id: z.string().min(3), childEntryId: z.string(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), propertyId: z.string(), value: z.object({}).partial().passthrough().optional() }));
export type TXubeModelConnectionProperties = z.infer<typeof XubeModelConnectionProperties>;
export const XubeSetModelConnectionPropertyRequest = z.object({ versionId: z.string(), instanceId: z.string().optional(), modelId: z.string(), connectionId: z.string(), childId: z.string(), propertyId: z.string(), value: z.object({}).partial().passthrough().optional() });
export type TXubeSetModelConnectionPropertyRequest = z.infer<typeof XubeSetModelConnectionPropertyRequest>;
export const XubeModelConnectionProperty = z.object({ childModelId: z.string().optional(), creator: z.string().optional(), parentModelId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("ENTITY:MODEL:FACET:CONNECTION-PROPERTY"), childVersionId: z.string().optional(), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("CONNECTION-PROPERTY"), versionId: z.string(), instanceId: z.string(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), connectionId: z.string(), id: z.string().min(3), childEntryId: z.string(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), propertyId: z.string(), value: z.object({}).partial().passthrough().optional() });
export type TXubeModelConnectionProperty = z.infer<typeof XubeModelConnectionProperty>;
export const XubeGetComponentManifestRequest = z.object({ componentId: z.string(), state: z.enum(["EXPECTED", "CURRENT"]).optional() });
export type TXubeGetComponentManifestRequest = z.infer<typeof XubeGetComponentManifestRequest>;
export const XubeComponentManifest = z.object({ creator: z.string().optional(), componentId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("ENTITY:COMPONENT:FACET:MANIFEST"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("MANIFEST"), entries: z.array(z.object({ ref: z.string().optional(), inline: z.object({}).partial().passthrough().optional(), kind: z.string(), checksum: z.string().optional(), placeholders: z.array(z.string()).optional(), contentType: z.string().optional() })), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), state: z.enum(["EXPECTED", "CURRENT"]), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubeComponentManifest = z.infer<typeof XubeComponentManifest>;
export const XubeSetComponentManifestRequest = z.object({ entries: z.array(z.object({ ref: z.string().optional(), inline: z.object({}).partial().passthrough().optional(), kind: z.string(), checksum: z.string().optional(), placeholders: z.array(z.string()).optional(), contentType: z.string().optional() })), componentId: z.string(), id: z.string().optional() });
export type TXubeSetComponentManifestRequest = z.infer<typeof XubeSetComponentManifestRequest>;
export const XubeListComponentPropertiesRequest = z.object({ componentId: z.string() });
export type TXubeListComponentPropertiesRequest = z.infer<typeof XubeListComponentPropertiesRequest>;
export const XubeComponentPropertyValues = z.array(z.object({ creator: z.string().optional(), componentId: z.string(), instance: z.object({ revisionId: z.string(), instanceId: z.string() }), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), origin: z.object({ versionId: z.string(), modelId: z.string(), modelPropertyId: z.string() }), entityId: z.string(), type: z.literal("ENTITY:COMPONENT:FACET:PROPERTY"), importEntryId: z.string().optional(), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("PROPERTY"), importId: z.string().optional(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), propertyId: z.string(), value: z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())])), z.record(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())]))])), z.record(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())])), z.record(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())]))]))])), z.record(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())])), z.record(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())]))])), z.record(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())])), z.record(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())]))]))]))]) }));
export type TXubeComponentPropertyValues = z.infer<typeof XubeComponentPropertyValues>;
export const XubeSetComponentPropertyRequest = z.object({ componentId: z.string(), instanceId: z.string().optional(), id: z.string().optional(), propertyId: z.string(), value: z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())])), z.record(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())]))])), z.record(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())])), z.record(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())]))]))])), z.record(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())])), z.record(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())]))])), z.record(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())])), z.record(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())]))]))]))]), modelPropertyId: z.string() });
export type TXubeSetComponentPropertyRequest = z.infer<typeof XubeSetComponentPropertyRequest>;
export const XubeListComponentCategoriesRequest = z.object({ componentId: z.string() });
export type TXubeListComponentCategoriesRequest = z.infer<typeof XubeListComponentCategoriesRequest>;
export const XubeRemoveModelExtendableSetRequest = z.object({ versionId: z.string(), modelId: z.string(), extendableSetId: z.string() });
export type TXubeRemoveModelExtendableSetRequest = z.infer<typeof XubeRemoveModelExtendableSetRequest>;
export const XubeGetComponentConnectionPropertyRequest = z.object({ componentId: z.string(), connectionId: z.string(), propertyId: z.string() });
export type TXubeGetComponentConnectionPropertyRequest = z.infer<typeof XubeGetComponentConnectionPropertyRequest>;
export const XubeComponentConnectionProperty = z.object({ creator: z.string().optional(), componentId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), origin: z.object({ versionId: z.string(), modelId: z.string() }).optional(), entityId: z.string(), type: z.literal("ENTITY:COMPONENT:FACET:CONNECTION-PROPERTY"), updater: z.string().optional(), revisionId: z.string(), accountId: z.string().optional(), facetType: z.literal("CONNECTION-PROPERTY"), instanceId: z.string(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), connectionId: z.string(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), propertyId: z.string(), value: z.object({}).partial().passthrough().optional() });
export type TXubeComponentConnectionProperty = z.infer<typeof XubeComponentConnectionProperty>;
export const XubeDeleteComponentConnectionPropertyRequest = z.object({ componentId: z.string(), connectionId: z.string(), propertyId: z.string() });
export type TXubeDeleteComponentConnectionPropertyRequest = z.infer<typeof XubeDeleteComponentConnectionPropertyRequest>;
export const XubeSetModelSlugRequest = z.object({ modelId: z.string(), slug: z.string() });
export type TXubeSetModelSlugRequest = z.infer<typeof XubeSetModelSlugRequest>;
export const XubeModelSlugFacet = z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("ENTITY:ENTITY:FACET:SLUG"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("SLUG"), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), slug: z.string() });
export type TXubeModelSlugFacet = z.infer<typeof XubeModelSlugFacet>;
export const XubeDeleteModelSlugRequest = z.object({ modelId: z.string() });
export type TXubeDeleteModelSlugRequest = z.infer<typeof XubeDeleteModelSlugRequest>;
export const XubeGetPropertyVersionRequest = z.object({ versionId: z.string(), propertyId: z.string() });
export type TXubeGetPropertyVersionRequest = z.infer<typeof XubeGetPropertyVersionRequest>;
export const XubeDeletePropertyVersionRequest = z.object({ versionId: z.string(), propertyId: z.string() });
export type TXubeDeletePropertyVersionRequest = z.infer<typeof XubeDeletePropertyVersionRequest>;
export const XubeUpdatePropertyVersionRequest = z.object({ lifecycle: z.enum(["DRAFT", "ACTIVE", "INACTIVE"]).optional(), instructions: z.string().optional(), versionId: z.string(), name: z.string().optional(), description: z.string().optional(), changelog: z.array(z.string()).optional(), propertyId: z.string() });
export type TXubeUpdatePropertyVersionRequest = z.infer<typeof XubeUpdatePropertyVersionRequest>;
export const XubeGetComponentStatusRequest = z.object({ componentId: z.string() });
export type TXubeGetComponentStatusRequest = z.infer<typeof XubeGetComponentStatusRequest>;
export const XubeComponentStatus = z.object({ reason: z.string().optional(), creator: z.string().optional(), componentId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), source: z.string().optional(), type: z.literal("ENTITY:COMPONENT:FACET:STATUS"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("STATUS"), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), status: z.enum(["HEALTHY", "WARNING", "DEGRADED", "CRITICAL", "UNKNOWN"]) });
export type TXubeComponentStatus = z.infer<typeof XubeComponentStatus>;
export const XubeSetComponentStatusRequest = z.object({ reason: z.string().optional(), componentId: z.string(), source: z.string().optional(), status: z.enum(["HEALTHY", "WARNING", "DEGRADED", "CRITICAL", "UNKNOWN"]) });
export type TXubeSetComponentStatusRequest = z.infer<typeof XubeSetComponentStatusRequest>;
export const XubeListComponentConnectionPropertiesRequest = z.object({ componentId: z.string(), connectionId: z.string() });
export type TXubeListComponentConnectionPropertiesRequest = z.infer<typeof XubeListComponentConnectionPropertiesRequest>;
export const XubeComponentConnectionProperties = z.array(z.object({ creator: z.string().optional(), componentId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), origin: z.object({ versionId: z.string(), modelId: z.string() }).optional(), entityId: z.string(), type: z.literal("ENTITY:COMPONENT:FACET:CONNECTION-PROPERTY"), updater: z.string().optional(), revisionId: z.string(), accountId: z.string().optional(), facetType: z.literal("CONNECTION-PROPERTY"), instanceId: z.string(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), connectionId: z.string(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), propertyId: z.string(), value: z.object({}).partial().passthrough().optional() }));
export type TXubeComponentConnectionProperties = z.infer<typeof XubeComponentConnectionProperties>;
export const XubeSetComponentConnectionPropertyRequest = z.object({ componentId: z.string(), instanceId: z.string().optional(), connectionId: z.string(), propertyId: z.string(), value: z.object({}).partial().passthrough().optional() });
export type TXubeSetComponentConnectionPropertyRequest = z.infer<typeof XubeSetComponentConnectionPropertyRequest>;
export const XubeGetComponentConfigurationRequest = z.object({ componentId: z.string(), configurationId: z.string() });
export type TXubeGetComponentConfigurationRequest = z.infer<typeof XubeGetComponentConfigurationRequest>;
export const XubeComponentConfiguration = z.object({ creator: z.string().optional(), componentId: z.string(), configuration: z.object({}).partial().passthrough(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), warnings: z.array(z.string()).optional(), entityId: z.string(), type: z.literal("ENTITY:COMPONENT:FACET:CONFIGURATION"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("CONFIGURATION"), service: z.string(), configId: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), state: z.enum(["COMPLETE", "INCOMPLETE", "INVALID"]), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), errors: z.array(z.string()).optional() });
export type TXubeComponentConfiguration = z.infer<typeof XubeComponentConfiguration>;
export const XubeGetDirectionFacetRequest = z.object({ versionId: z.string(), modelId: z.string() });
export type TXubeGetDirectionFacetRequest = z.infer<typeof XubeGetDirectionFacetRequest>;
export const XubeDirectionFacet = z.object({ creator: z.string().optional(), modelId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("ENTITY:ENTITY:FACET:DIRECTION"), chainable: z.boolean().optional(), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("DIRECTION"), versionId: z.string(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), direction: z.enum(["IN", "OUT", "DUPLEX", "IN_OUT", "IN_DUPLEX", "OUT_DUPLEX", "IN_OUT_DUPLEX", "ANY", "NONE"]) });
export type TXubeDirectionFacet = z.infer<typeof XubeDirectionFacet>;
export const XubeSetDirectionFacetRequest = z.object({ versionId: z.string(), modelId: z.string(), chainable: z.boolean().optional(), direction: z.enum(["IN", "OUT", "DUPLEX", "IN_OUT", "IN_DUPLEX", "OUT_DUPLEX", "IN_OUT_DUPLEX", "ANY", "NONE"]) });
export type TXubeSetDirectionFacetRequest = z.infer<typeof XubeSetDirectionFacetRequest>;
export const XubeDeleteDirectionFacetRequest = z.object({ versionId: z.string(), modelId: z.string() });
export type TXubeDeleteDirectionFacetRequest = z.infer<typeof XubeDeleteDirectionFacetRequest>;
export const XubeSetComponentSlugRequest = z.object({ componentId: z.string(), slug: z.string() });
export type TXubeSetComponentSlugRequest = z.infer<typeof XubeSetComponentSlugRequest>;
export const XubeComponentSlugFacet = z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("ENTITY:ENTITY:FACET:SLUG"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("SLUG"), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), slug: z.string() });
export type TXubeComponentSlugFacet = z.infer<typeof XubeComponentSlugFacet>;
export const XubeDeleteComponentSlugRequest = z.object({ componentId: z.string() });
export type TXubeDeleteComponentSlugRequest = z.infer<typeof XubeDeleteComponentSlugRequest>;
export const XubeListModelsRequest = z.object({ accountId: z.string(), service: z.string(), modelType: z.string() }).partial();
export type TXubeListModelsRequest = z.infer<typeof XubeListModelsRequest>;
export const XubeModels = z.array(z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityType: z.string(), description: z.string().optional(), modelType: z.string(), type: z.string(), updater: z.string().optional(), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), service: z.string().optional(), name: z.string().optional(), isGlobal: z.boolean().optional(), derivedFrom: z.object({ versionId: z.string(), modelId: z.string() }).optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() }));
export type TXubeModels = z.infer<typeof XubeModels>;
export const XubeCreateModelRequest = z.object({ accountId: z.string().optional(), entityType: z.string().regex(/^[A-Z][A-Z0-9-]*$/), name: z.string(), description: z.string().optional(), id: z.string().optional(), modelType: z.string() });
export type TXubeCreateModelRequest = z.infer<typeof XubeCreateModelRequest>;
export const XubeModel = z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityType: z.string(), description: z.string().optional(), modelType: z.string(), type: z.string(), updater: z.string().optional(), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), service: z.string().optional(), name: z.string().optional(), isGlobal: z.boolean().optional(), derivedFrom: z.object({ versionId: z.string(), modelId: z.string() }).optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubeModel = z.infer<typeof XubeModel>;
export const XubeListComponentChildrenRequest = z.object({ componentId: z.string() });
export type TXubeListComponentChildrenRequest = z.infer<typeof XubeListComponentChildrenRequest>;
export const XubeComponentChildren = z.array(z.object({ creator: z.string().optional(), componentId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), origin: z.object({ versionId: z.string(), modelId: z.string() }).optional(), extendableSetId: z.string().min(1).optional(), entityId: z.string(), originChildEntryId: z.string().optional(), type: z.literal("ENTITY:COMPONENT:FACET:CHILD"), childId: z.string(), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("CHILD"), exposure: z.enum(["INTERNAL", "EXTERNAL", "BOUNDARY"]).optional(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() }));
export type TXubeComponentChildren = z.infer<typeof XubeComponentChildren>;
export const XubeAddComponentChildRequest = z.object({ componentId: z.string(), exposure: z.enum(["INTERNAL", "EXTERNAL", "BOUNDARY"]).optional(), extendableSetId: z.string().optional(), id: z.string().optional(), childId: z.string() });
export type TXubeAddComponentChildRequest = z.infer<typeof XubeAddComponentChildRequest>;
export const XubeComponentChild = z.object({ creator: z.string().optional(), componentId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), origin: z.object({ versionId: z.string(), modelId: z.string() }).optional(), extendableSetId: z.string().min(1).optional(), entityId: z.string(), originChildEntryId: z.string().optional(), type: z.literal("ENTITY:COMPONENT:FACET:CHILD"), childId: z.string(), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("CHILD"), exposure: z.enum(["INTERNAL", "EXTERNAL", "BOUNDARY"]).optional(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubeComponentChild = z.infer<typeof XubeComponentChild>;
export const XubeListModelExtendableSetsRequest = z.object({ versionId: z.string(), modelId: z.string() });
export type TXubeListModelExtendableSetsRequest = z.infer<typeof XubeListModelExtendableSetsRequest>;
export const XubeModelExtendableSets = z.array(z.object({ creator: z.string().optional(), modelId: z.string().min(1), instances: z.object({ default: z.number().int().gte(-9007199254740991).lte(9007199254740991).optional(), min: z.number().int().gte(-9007199254740991).lte(9007199254740991), max: z.number().int().gte(-9007199254740991).lte(9007199254740991) }), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), extendableSetId: z.string().min(1), entityId: z.string(), type: z.literal("ENTITY:MODEL:FACET:EXTENDABLE-SET"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("EXTENDABLE-SET"), versionId: z.string().min(1), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() }));
export type TXubeModelExtendableSets = z.infer<typeof XubeModelExtendableSets>;
export const XubeAttachModelExtendableSetRequest = z.object({ versionId: z.string(), modelId: z.string(), instances: z.object({ default: z.number().int().gte(-9007199254740991).lte(9007199254740991).optional(), min: z.number().int().gte(-9007199254740991).lte(9007199254740991), max: z.number().int().gte(-9007199254740991).lte(9007199254740991) }), extendableSetId: z.string().optional(), id: z.string().optional() });
export type TXubeAttachModelExtendableSetRequest = z.infer<typeof XubeAttachModelExtendableSetRequest>;
export const XubeModelExtendableSet = z.object({ creator: z.string().optional(), modelId: z.string().min(1), instances: z.object({ default: z.number().int().gte(-9007199254740991).lte(9007199254740991).optional(), min: z.number().int().gte(-9007199254740991).lte(9007199254740991), max: z.number().int().gte(-9007199254740991).lte(9007199254740991) }), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), extendableSetId: z.string().min(1), entityId: z.string(), type: z.literal("ENTITY:MODEL:FACET:EXTENDABLE-SET"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("EXTENDABLE-SET"), versionId: z.string().min(1), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubeModelExtendableSet = z.infer<typeof XubeModelExtendableSet>;
export const XubeListComponentsByCategoryRequest = z.object({ accountId: z.string().optional(), componentType: z.string().optional(), nextToken: z.string().optional(), isGlobal: z.boolean().optional(), limit: z.number().int().gte(1).lte(9007199254740991).optional(), category: z.string().min(1) });
export type TXubeListComponentsByCategoryRequest = z.infer<typeof XubeListComponentsByCategoryRequest>;
export const XubeComponentsByCategory = z.object({ data: z.array(z.object({ componentType: z.string(), creator: z.string().optional(), serialNumber: z.string().optional(), allowsCyclicalChildConnections: z.boolean().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityType: z.string(), description: z.string().optional(), type: z.string(), updater: z.string().optional(), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), service: z.string().optional(), name: z.string().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), modelOrigin: z.object({ versionId: z.string(), modelId: z.string() }), slug: z.string().optional() })), nextToken: z.string().optional() });
export type TXubeComponentsByCategory = z.infer<typeof XubeComponentsByCategory>;
export const XubeListModelChildrenRequest = z.object({ versionId: z.string(), modelId: z.string() });
export type TXubeListModelChildrenRequest = z.infer<typeof XubeListModelChildrenRequest>;
export const XubeModelChildren = z.array(z.object({ childModelId: z.string(), creator: z.string().optional(), modelId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), extendableSetId: z.string().min(1).optional(), entityId: z.string(), type: z.literal("ENTITY:MODEL:FACET:CHILD"), childId: z.string(), childVersionId: z.string(), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("CHILD"), versionId: z.string(), exposure: z.enum(["INTERNAL", "EXTERNAL", "BOUNDARY"]).optional(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), childEntryId: z.string(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() }));
export type TXubeModelChildren = z.infer<typeof XubeModelChildren>;
export const XubeAddModelChildRequest = z.object({ versionId: z.string(), exposure: z.enum(["INTERNAL", "EXTERNAL", "BOUNDARY"]).optional(), modelId: z.string(), extendableSetId: z.string().optional(), id: z.string().optional(), childId: z.string(), childVersionId: z.string() });
export type TXubeAddModelChildRequest = z.infer<typeof XubeAddModelChildRequest>;
export const XubeModelChild = z.object({ childModelId: z.string(), creator: z.string().optional(), modelId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), extendableSetId: z.string().min(1).optional(), entityId: z.string(), type: z.literal("ENTITY:MODEL:FACET:CHILD"), childId: z.string(), childVersionId: z.string(), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("CHILD"), versionId: z.string(), exposure: z.enum(["INTERNAL", "EXTERNAL", "BOUNDARY"]).optional(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), childEntryId: z.string(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubeModelChild = z.infer<typeof XubeModelChild>;
export const XubeListComponentsRequest = z.object({ accountId: z.string(), componentType: z.string(), service: z.string() }).partial();
export type TXubeListComponentsRequest = z.infer<typeof XubeListComponentsRequest>;
export const XubeComponents = z.array(z.object({ componentType: z.string(), creator: z.string().optional(), serialNumber: z.string().optional(), allowsCyclicalChildConnections: z.boolean().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityType: z.string(), description: z.string().optional(), type: z.string(), updater: z.string().optional(), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), service: z.string().optional(), name: z.string().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), modelOrigin: z.object({ versionId: z.string(), modelId: z.string() }), slug: z.string().optional() }));
export type TXubeComponents = z.infer<typeof XubeComponents>;
export const XubeCreateComponentRequest1 = z.object({ componentType: z.string(), accountId: z.string().optional(), versionId: z.string(), serialNumber: z.string().optional(), modelId: z.string(), name: z.string(), description: z.string().optional(), id: z.string().optional() });
export type TXubeCreateComponentRequest1 = z.infer<typeof XubeCreateComponentRequest1>;
export const XubeReactivateComponentRequest = z.object({ componentId: z.string() });
export type TXubeReactivateComponentRequest = z.infer<typeof XubeReactivateComponentRequest>;
export const XubeRemoveModelConfigBindingRequest = z.object({ versionId: z.string(), modelId: z.string(), configBindingId: z.string() });
export type TXubeRemoveModelConfigBindingRequest = z.infer<typeof XubeRemoveModelConfigBindingRequest>;
export const XubeGetModelConnectionPropertyRequest = z.object({ versionId: z.string(), instanceId: z.string(), modelId: z.string(), connectionId: z.string(), childId: z.string(), propertyId: z.string() });
export type TXubeGetModelConnectionPropertyRequest = z.infer<typeof XubeGetModelConnectionPropertyRequest>;
export const XubeDeleteModelConnectionPropertyRequest = z.object({ versionId: z.string(), instanceId: z.string(), modelId: z.string(), connectionId: z.string(), childId: z.string(), propertyId: z.string() });
export type TXubeDeleteModelConnectionPropertyRequest = z.infer<typeof XubeDeleteModelConnectionPropertyRequest>;
export const XubeGetModelPropertyRequest = z.object({ versionId: z.string(), modelId: z.string(), declarationId: z.string() });
export type TXubeGetModelPropertyRequest = z.infer<typeof XubeGetModelPropertyRequest>;
export const XubeRemoveModelPropertyRequest = z.object({ versionId: z.string(), modelId: z.string(), declarationId: z.string() });
export type TXubeRemoveModelPropertyRequest = z.infer<typeof XubeRemoveModelPropertyRequest>;
export const XubeUpdateModelPropertyRequest = z.object({ schema: z.object({}).partial().passthrough().optional(), versionId: z.string(), default: z.object({}).partial().passthrough().optional(), unsetFields: z.array(z.enum(["value", "default"])).optional(), modelId: z.string(), declarationId: z.string(), instances: z.object({ default: z.number().int().gte(-9007199254740991).lte(9007199254740991), min: z.number().int().gte(-9007199254740991).lte(9007199254740991), max: z.number().int().gte(-9007199254740991).lte(9007199254740991) }).partial().optional(), configurability: z.enum(["INHERENT", "IMMUTABLE", "CONFIGURABLE", "DERIVED"]).optional(), scopeCeiling: z.enum(["SELF", "DEVICE", "ENCLOSURE", "SYSTEM", "SITE", "ACCOUNT"]).optional(), value: z.object({}).partial().passthrough().optional(), required: z.boolean().optional(), searchable: z.boolean().optional() });
export type TXubeUpdateModelPropertyRequest = z.infer<typeof XubeUpdateModelPropertyRequest>;
export const XubeGetModelPriceRequest = z.object({ versionId: z.string(), modelId: z.string() });
export type TXubeGetModelPriceRequest = z.infer<typeof XubeGetModelPriceRequest>;
export const XubeModelPrice = z.object({ creator: z.string().optional(), amount: z.number().gte(0).multipleOf(0.01), modelId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("ENTITY:MODEL:FACET:PRICE"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("PRICE"), versionId: z.string(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), currency: z.literal("USD"), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubeModelPrice = z.infer<typeof XubeModelPrice>;
export const XubeSetModelPriceRequest = z.object({ versionId: z.string(), amount: z.number().gte(0).multipleOf(0.01), modelId: z.string(), id: z.string().optional() });
export type TXubeSetModelPriceRequest = z.infer<typeof XubeSetModelPriceRequest>;
export const XubeDeleteModelPriceRequest = z.object({ versionId: z.string(), modelId: z.string() });
export type TXubeDeleteModelPriceRequest = z.infer<typeof XubeDeleteModelPriceRequest>;
export const XubeListMountingFacetsRequest = z.object({ versionId: z.string(), modelId: z.string() });
export type TXubeListMountingFacetsRequest = z.infer<typeof XubeListMountingFacetsRequest>;
export const XubeMountingFacets = z.array(z.object({ instructions: z.string().optional(), creator: z.string().optional(), modelId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("ENTITY:ENTITY:FACET:MOUNTING"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("MOUNTING"), versionId: z.string(), exposure: z.enum(["INTERNAL", "EXTERNAL", "BOUNDARY"]), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() }));
export type TXubeMountingFacets = z.infer<typeof XubeMountingFacets>;
export const XubeCreateMountingFacetRequest = z.object({ instructions: z.string().optional(), versionId: z.string(), exposure: z.enum(["INTERNAL", "EXTERNAL", "BOUNDARY"]), modelId: z.string() });
export type TXubeCreateMountingFacetRequest = z.infer<typeof XubeCreateMountingFacetRequest>;
export const XubeListCompatibilityFacetsRequest = z.object({ versionId: z.string(), modelId: z.string() });
export type TXubeListCompatibilityFacetsRequest = z.infer<typeof XubeListCompatibilityFacetsRequest>;
export const XubeCreateCompatibilityFacetRequest = z.object({ versionId: z.string(), compatibleModelId: z.string(), modelId: z.string() });
export type TXubeCreateCompatibilityFacetRequest = z.infer<typeof XubeCreateCompatibilityFacetRequest>;
export const XubeCompatibilityFacet = z.object({ creator: z.string().optional(), modelId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("ENTITY:ENTITY:FACET:COMPATIBILITY"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("COMPATIBILITY"), versionId: z.string(), compatibleModelId: z.string(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubeCompatibilityFacet = z.infer<typeof XubeCompatibilityFacet>;
export const XubeListModelConfigBindingsRequest = z.object({ jsonPointer: z.string().regex(/^(?:|(?:\/(?:[^~]|~[01])*)+)$/).optional(), bindingGroupId: z.string().optional(), versionId: z.string(), modelId: z.string(), artefactPath: z.string().min(1).optional(), propertyId: z.string().optional(), modelPropertyId: z.string().optional() });
export type TXubeListModelConfigBindingsRequest = z.infer<typeof XubeListModelConfigBindingsRequest>;
export const XubeAttachModelConfigBindingObjectFieldRequest = z.object({ transformId: z.literal("object-field"), parameters: z.object({ outputKey: z.string().min(1) }) });
export type TXubeAttachModelConfigBindingObjectFieldRequest = z.infer<typeof XubeAttachModelConfigBindingObjectFieldRequest>;
export const XubeAttachModelConfigBindingIntegerBooleanRequest = z.object({ transformId: z.literal("integer-boolean"), parameters: z.object({  }).partial() });
export type TXubeAttachModelConfigBindingIntegerBooleanRequest = z.infer<typeof XubeAttachModelConfigBindingIntegerBooleanRequest>;
export const XubeModelConfigBindings = z.array(z.object({ jsonPointer: z.string().regex(/^(?:|(?:\/(?:[^~]|~[01])*)+)$/), modelId: z.string().min(1), artefactPath: z.string().min(1), missingValuePolicy: z.enum(["ERROR", "IGNORE"]), type: z.literal("ENTITY:MODEL:FACET:CONFIG-BINDING"), updater: z.string().optional(), bindingGroupId: z.string().min(1).optional(), facetType: z.literal("CONFIG-BINDING"), transform:
                z.discriminatedUnion("transformId", [XubeAttachModelConfigBindingObjectFieldRequest, XubeAttachModelConfigBindingIntegerBooleanRequest])
            .optional(), propertyVersionId: z.string().min(1), id: z.string().min(3), propertyId: z.string().min(1), configBindingId: z.string().min(1), direction: z.enum(["IMPORT", "EXPORT", "BOTH"]), creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), secretPolicy: z.enum(["VALUE", "SECRET-REFERENCE"]).default("VALUE"), entityId: z.string(), modelPropertyId: z.string().min(1), accountId: z.string().optional(), versionId: z.string().min(1), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() }));
export type TXubeModelConfigBindings = z.infer<typeof XubeModelConfigBindings>;
export const XubeAttachModelConfigBindingRequest = z.object({ jsonPointer: z.string().regex(/^(?:|(?:\/(?:[^~]|~[01])*)+)$/), modelId: z.string(), secretPolicy: z.enum(["VALUE", "SECRET-REFERENCE"]).default("VALUE"), artefactPath: z.string().min(1), missingValuePolicy: z.enum(["ERROR", "IGNORE"]), modelPropertyId: z.string(), bindingGroupId: z.string().min(1).optional(), versionId: z.string(), transform:
                z.discriminatedUnion("transformId", [XubeAttachModelConfigBindingObjectFieldRequest, XubeAttachModelConfigBindingIntegerBooleanRequest])
            .optional(), propertyVersionId: z.string(), id: z.string().optional(), propertyId: z.string(), configBindingId: z.string().optional(), direction: z.enum(["IMPORT", "EXPORT", "BOTH"]) });
export type TXubeAttachModelConfigBindingRequest = z.infer<typeof XubeAttachModelConfigBindingRequest>;
export const XubeModelConfigBinding = z.object({ jsonPointer: z.string().regex(/^(?:|(?:\/(?:[^~]|~[01])*)+)$/), modelId: z.string().min(1), artefactPath: z.string().min(1), missingValuePolicy: z.enum(["ERROR", "IGNORE"]), type: z.literal("ENTITY:MODEL:FACET:CONFIG-BINDING"), updater: z.string().optional(), bindingGroupId: z.string().min(1).optional(), facetType: z.literal("CONFIG-BINDING"), transform:
                z.discriminatedUnion("transformId", [XubeAttachModelConfigBindingObjectFieldRequest, XubeAttachModelConfigBindingIntegerBooleanRequest])
            .optional(), propertyVersionId: z.string().min(1), id: z.string().min(3), propertyId: z.string().min(1), configBindingId: z.string().min(1), direction: z.enum(["IMPORT", "EXPORT", "BOTH"]), creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), secretPolicy: z.enum(["VALUE", "SECRET-REFERENCE"]).default("VALUE"), entityId: z.string(), modelPropertyId: z.string().min(1), accountId: z.string().optional(), versionId: z.string().min(1), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubeModelConfigBinding = z.infer<typeof XubeModelConfigBinding>;
export const XubeReportComponentManifestRequest = z.object({ entries: z.array(z.object({ ref: z.string().optional(), inline: z.object({}).partial().passthrough().optional(), kind: z.string(), checksum: z.string().optional(), placeholders: z.array(z.string()).optional(), contentType: z.string().optional() })), componentId: z.string(), id: z.string().optional() });
export type TXubeReportComponentManifestRequest = z.infer<typeof XubeReportComponentManifestRequest>;
export const XubeListComponentConnectionsRequest = z.object({ componentId: z.string() });
export type TXubeListComponentConnectionsRequest = z.infer<typeof XubeListComponentConnectionsRequest>;
export const XubeComponentConnections = z.array(z.object({ peerId: z.string(), creator: z.string().optional(), componentId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), origin: z.object({ versionId: z.string(), modelId: z.string() }).optional(), entityId: z.string(), type: z.literal("ENTITY:COMPONENT:FACET:CONNECTION"), updater: z.string().optional(), accountId: z.string().optional(), interfaceType: z.string().optional(), facetType: z.literal("CONNECTION"), peerInterfaceChildEntryId: z.string().optional(), service: z.string(), interfaceChildEntryId: z.string().optional(), name: z.string().optional(), isGlobal: z.boolean().optional(), cableEntryId: z.string().optional(), connectionId: z.string(), id: z.string().min(3), state: z.enum(["COMPLETE", "INCOMPLETE", "INVALID"]), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() }));
export type TXubeComponentConnections = z.infer<typeof XubeComponentConnections>;
export const XubeCreateComponentConnectionRequest = z.object({ interfaceType: z.string().optional(), components: z.array(z.union([z.union([z.object({ componentId: z.string() }), z.object({ componentId: z.string(), interfaceChildEntryId: z.string() })]), z.union([z.object({ componentId: z.string() }), z.object({ componentId: z.string(), interfaceChildEntryId: z.string() })])])).min(2).max(2), cableEntryId: z.string().optional(), connectionId: z.string().optional() });
export type TXubeCreateComponentConnectionRequest = z.infer<typeof XubeCreateComponentConnectionRequest>;
export const XubeComponentConnection = z.object({ peerId: z.string(), creator: z.string().optional(), componentId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), origin: z.object({ versionId: z.string(), modelId: z.string() }).optional(), entityId: z.string(), type: z.literal("ENTITY:COMPONENT:FACET:CONNECTION"), updater: z.string().optional(), accountId: z.string().optional(), interfaceType: z.string().optional(), facetType: z.literal("CONNECTION"), peerInterfaceChildEntryId: z.string().optional(), service: z.string(), interfaceChildEntryId: z.string().optional(), name: z.string().optional(), isGlobal: z.boolean().optional(), cableEntryId: z.string().optional(), connectionId: z.string(), id: z.string().min(3), state: z.enum(["COMPLETE", "INCOMPLETE", "INVALID"]), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubeComponentConnection = z.infer<typeof XubeComponentConnection>;
export const XubeImportComponentPropertiesRequest = z.object({ revisionId: z.string().min(1), componentId: z.string().min(1), importId: z.string().min(1), values: z.array(z.object({ instanceId: z.string().min(1), importEntryId: z.string().min(1), propertyId: z.string().min(1), value: z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())])), z.record(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())]))])), z.record(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())])), z.record(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())]))]))])), z.record(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())])), z.record(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())]))])), z.record(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())])), z.record(z.union([z.union([z.string(), z.number(), z.boolean()]), z.array(z.object({}).partial().passthrough()), z.record(z.object({}).partial().passthrough())]))]))]))]), modelPropertyId: z.string().min(1) })).min(1).max(50) });
export type TXubeImportComponentPropertiesRequest = z.infer<typeof XubeImportComponentPropertiesRequest>;
export const XubeGetVersionRequest = z.object({ versionId: z.string(), modelId: z.string() });
export type TXubeGetVersionRequest = z.infer<typeof XubeGetVersionRequest>;
export const XubeDeleteVersionRequest = z.object({ versionId: z.string(), modelId: z.string() });
export type TXubeDeleteVersionRequest = z.infer<typeof XubeDeleteVersionRequest>;
export const XubeUpdateVersionRequest = z.object({ lifecycle: z.enum(["DRAFT", "ACTIVE", "INACTIVE"]).optional(), versionId: z.string(), allowsCyclicalChildConnections: z.boolean().optional(), modelId: z.string(), name: z.string().optional(), description: z.string().optional(), changelog: z.array(z.string()).optional() });
export type TXubeUpdateVersionRequest = z.infer<typeof XubeUpdateVersionRequest>;
export const XubeListVersionsRequest = z.object({ modelId: z.string() });
export type TXubeListVersionsRequest = z.infer<typeof XubeListVersionsRequest>;
export const XubeModelVersions = z.array(z.object({ creator: z.string().optional(), allowsCyclicalChildConnections: z.boolean().optional(), modelId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), cloneFrom: z.string().optional(), description: z.string().optional(), changelog: z.array(z.string()).optional(), type: z.string(), updater: z.string().optional(), lifecycle: z.enum(["DRAFT", "ACTIVE", "INACTIVE"]), accountId: z.string().optional(), versionId: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() }));
export type TXubeModelVersions = z.infer<typeof XubeModelVersions>;
export const XubeCreateVersionRequest = z.object({ versionId: z.string().optional(), allowsCyclicalChildConnections: z.boolean().optional(), modelId: z.string(), name: z.string().optional(), cloneFrom: z.string().optional(), description: z.string().optional(), changelog: z.array(z.string()).optional(), id: z.string().optional() });
export type TXubeCreateVersionRequest = z.infer<typeof XubeCreateVersionRequest>;
export const XubeUpsertComponentManifestEntriesRequest = z.object({ entries: z.array(z.object({ ref: z.string().optional(), inline: z.object({}).partial().passthrough().optional(), kind: z.string(), checksum: z.string().optional(), placeholders: z.array(z.string()).optional(), contentType: z.string().optional() })).max(50), componentId: z.string(), baseManifestId: z.string().optional(), removeKinds: z.array(z.string().min(1)).max(50).default([]), id: z.string().optional() });
export type TXubeUpsertComponentManifestEntriesRequest = z.infer<typeof XubeUpsertComponentManifestEntriesRequest>;
export const XubeListPropertiesRequest = z.object({ accountId: z.string(), service: z.string() }).partial();
export type TXubeListPropertiesRequest = z.infer<typeof XubeListPropertiesRequest>;
export const XubeProperties = z.array(z.object({ instructions: z.string().optional(), creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), description: z.string().optional(), type: z.literal("ENTITY:PROPERTY"), updater: z.string().optional(), accountId: z.string().optional(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), configurability: z.enum(["INHERENT", "IMMUTABLE", "CONFIGURABLE", "DERIVED"]).default("CONFIGURABLE"), id: z.string().min(3), sensitivity: z.enum(["PUBLIC", "SECRET", "RESTRICTED"]).optional(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), allowedEntities: z.array(z.string()).optional(), slug: z.string().optional() }));
export type TXubeProperties = z.infer<typeof XubeProperties>;
export const XubeCreatePropertyRequest = z.object({ instructions: z.string().optional(), accountId: z.string().optional(), name: z.string(), initialVersion: z.object({ schema: z.object({}).partial().passthrough(), instructions: z.string().optional(), versionId: z.string().optional(), name: z.string().optional(), description: z.string().optional(), changelog: z.array(z.string()).optional(), id: z.string().optional(), sensitivity: z.enum(["PUBLIC", "SECRET", "RESTRICTED"]), allowedEntities: z.array(z.string().regex(/^[A-Z][A-Z0-9-]*$/)).optional() }).optional(), description: z.string().optional(), configurability: z.enum(["INHERENT", "IMMUTABLE", "CONFIGURABLE", "DERIVED"]).optional(), id: z.string().optional(), sensitivity: z.enum(["PUBLIC", "SECRET", "RESTRICTED"]).optional(), allowedEntities: z.array(z.string().regex(/^[A-Z][A-Z0-9-]*$/)).optional() });
export type TXubeCreatePropertyRequest = z.infer<typeof XubeCreatePropertyRequest>;
export const XubeShrinkExtendableSetRequest = z.object({ componentId: z.string(), extendableSetId: z.string(), childEntryId: z.string() });
export type TXubeShrinkExtendableSetRequest = z.infer<typeof XubeShrinkExtendableSetRequest>;
export const XubeGetModelConnectionRequest = z.object({ versionId: z.string(), modelId: z.string(), connectionId: z.string() });
export type TXubeGetModelConnectionRequest = z.infer<typeof XubeGetModelConnectionRequest>;
export const XubeDeleteModelConnectionRequest = z.object({ versionId: z.string(), modelId: z.string(), connectionId: z.string() });
export type TXubeDeleteModelConnectionRequest = z.infer<typeof XubeDeleteModelConnectionRequest>;
export const XubeGetLayoutFacetRequest = z.object({ versionId: z.string(), modelId: z.string() });
export type TXubeGetLayoutFacetRequest = z.infer<typeof XubeGetLayoutFacetRequest>;
export const XubeLayoutFacet = z.object({ creator: z.string().optional(), modelId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), positions: z.record(z.object({ x: z.number(), y: z.number() })), type: z.literal("ENTITY:MODEL:FACET:LAYOUT"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("LAYOUT"), versionId: z.string(), sizes: z.record(z.object({ width: z.number(), height: z.number() })).optional(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubeLayoutFacet = z.infer<typeof XubeLayoutFacet>;
export const XubeSetLayoutFacetRequest = z.object({ versionId: z.string(), sizes: z.record(z.object({ width: z.number(), height: z.number() })).optional(), modelId: z.string(), positions: z.record(z.object({ x: z.number(), y: z.number() })) });
export type TXubeSetLayoutFacetRequest = z.infer<typeof XubeSetLayoutFacetRequest>;
export const XubeListModelsByCategoryRequest = z.object({ accountId: z.string().optional(), nextToken: z.string().optional(), isGlobal: z.boolean().optional(), limit: z.number().int().gte(1).lte(9007199254740991).optional(), modelType: z.string().optional(), category: z.string().min(1) });
export type TXubeListModelsByCategoryRequest = z.infer<typeof XubeListModelsByCategoryRequest>;
export const XubeModelsByCategory = z.object({ data: z.array(z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityType: z.string(), description: z.string().optional(), modelType: z.string(), type: z.string(), updater: z.string().optional(), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), service: z.string().optional(), name: z.string().optional(), isGlobal: z.boolean().optional(), derivedFrom: z.object({ versionId: z.string(), modelId: z.string() }).optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() })), nextToken: z.string().optional() });
export type TXubeModelsByCategory = z.infer<typeof XubeModelsByCategory>;
export const XubeListComponentConfigurationsRequest = z.object({ componentId: z.string() });
export type TXubeListComponentConfigurationsRequest = z.infer<typeof XubeListComponentConfigurationsRequest>;
export const XubeComponentConfigurations = z.array(z.object({ creator: z.string().optional(), componentId: z.string(), configuration: z.object({}).partial().passthrough(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), warnings: z.array(z.string()).optional(), entityId: z.string(), type: z.literal("ENTITY:COMPONENT:FACET:CONFIGURATION"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("CONFIGURATION"), service: z.string(), configId: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), state: z.enum(["COMPLETE", "INCOMPLETE", "INVALID"]), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), errors: z.array(z.string()).optional() }));
export type TXubeComponentConfigurations = z.infer<typeof XubeComponentConfigurations>;
export const XubeCreateComponentConfigurationRequest = z.object({ componentId: z.string(), configuration: z.object({}).partial().passthrough() });
export type TXubeCreateComponentConfigurationRequest = z.infer<typeof XubeCreateComponentConfigurationRequest>;
export const XubeGetComponentConnectionRequest = z.object({ componentId: z.string(), connectionId: z.string() });
export type TXubeGetComponentConnectionRequest = z.infer<typeof XubeGetComponentConnectionRequest>;
export const XubeDeleteComponentConnectionRequest = z.object({ componentId: z.string(), connectionId: z.string() });
export type TXubeDeleteComponentConnectionRequest = z.infer<typeof XubeDeleteComponentConnectionRequest>;
export const XubeGetModelRequest = z.object({ modelId: z.string() });
export type TXubeGetModelRequest = z.infer<typeof XubeGetModelRequest>;
export const XubeDeleteModelRequest = z.object({ modelId: z.string() });
export type TXubeDeleteModelRequest = z.infer<typeof XubeDeleteModelRequest>;
export const XubeUpdateModelRequest = z.object({ lifecycle: z.enum(["ACTIVE", "INACTIVE"]).optional(), modelId: z.string(), name: z.string().optional(), description: z.string().optional() });
export type TXubeUpdateModelRequest = z.infer<typeof XubeUpdateModelRequest>;
export const XubeRemoveModelChildRequest = z.object({ versionId: z.string(), modelId: z.string(), childId: z.string() });
export type TXubeRemoveModelChildRequest = z.infer<typeof XubeRemoveModelChildRequest>;
export const XubeUpdateModelChildRequest = z.object({ versionId: z.string(), exposure: z.enum(["INTERNAL", "EXTERNAL", "BOUNDARY"]), modelId: z.string(), childEntryId: z.string() });
export type TXubeUpdateModelChildRequest = z.infer<typeof XubeUpdateModelChildRequest>;
export const XubeGetModelPartRequest = z.object({ modelId: z.string() });
export type TXubeGetModelPartRequest = z.infer<typeof XubeGetModelPartRequest>;
export const XubeModelPartFacet = z.object({ accountId: z.string().optional(), creator: z.string().optional(), facetType: z.literal("PART"), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), entityId: z.string(), id: z.string().min(3), type: z.literal("ENTITY:ENTITY:FACET:PART"), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), updater: z.string().optional() });
export type TXubeModelPartFacet = z.infer<typeof XubeModelPartFacet>;
export const XubeAddModelPartRequest = z.object({ modelId: z.string() });
export type TXubeAddModelPartRequest = z.infer<typeof XubeAddModelPartRequest>;
export const XubeRemoveModelPartRequest = z.object({ modelId: z.string() });
export type TXubeRemoveModelPartRequest = z.infer<typeof XubeRemoveModelPartRequest>;
export const XubeGetWeightRequest = z.object({ versionId: z.string(), modelId: z.string() });
export type TXubeGetWeightRequest = z.infer<typeof XubeGetWeightRequest>;
export const XubeGetWeightResponse = z.object({ weight: z.object({ creator: z.string().optional(), modelId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }), weight: z.number().gt(0), entityId: z.string(), type: z.literal("GEOMETRY:MODEL:FACET:WEIGHT"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("WEIGHT"), versionId: z.string(), unit: z.enum(["g", "kg", "lb", "oz"]), weightConfigurability: z.enum(["INHERENT", "IMMUTABLE", "CONFIGURABLE", "DERIVED"]).optional(), service: z.literal("Geometry"), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() }) });
export type TXubeGetWeightResponse = z.infer<typeof XubeGetWeightResponse>;
export const XubeSetWeightRequest = z.object({ versionId: z.string(), unit: z.enum(["g", "kg", "lb", "oz"]), modelId: z.string(), weightConfigurability: z.enum(["INHERENT", "IMMUTABLE", "CONFIGURABLE", "DERIVED"]).optional(), weight: z.number().gt(0) });
export type TXubeSetWeightRequest = z.infer<typeof XubeSetWeightRequest>;
export const XubeSetWeightResponse = z.object({ weight: z.object({ creator: z.string().optional(), modelId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }), weight: z.number().gt(0), entityId: z.string(), type: z.literal("GEOMETRY:MODEL:FACET:WEIGHT"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("WEIGHT"), versionId: z.string(), unit: z.enum(["g", "kg", "lb", "oz"]), weightConfigurability: z.enum(["INHERENT", "IMMUTABLE", "CONFIGURABLE", "DERIVED"]).optional(), service: z.literal("Geometry"), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() }) });
export type TXubeSetWeightResponse = z.infer<typeof XubeSetWeightResponse>;
export const XubeDeleteWeightRequest = z.object({ versionId: z.string(), modelId: z.string() });
export type TXubeDeleteWeightRequest = z.infer<typeof XubeDeleteWeightRequest>;
export const XubeDeleteWeightResponse = z.object({ deleted: z.boolean() });
export type TXubeDeleteWeightResponse = z.infer<typeof XubeDeleteWeightResponse>;
export const XubeGetComponentColorsRequest = z.object({ componentId: z.string() });
export type TXubeGetComponentColorsRequest = z.infer<typeof XubeGetComponentColorsRequest>;
export const XubeGetComponentColorsResponse = z.object({ colors: z.object({ creator: z.string().optional(), componentId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }), entityId: z.string(), type: z.literal("GEOMETRY:COMPONENT:FACET:COLORS"), colors: z.record(z.string().regex(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/)), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("COLORS"), service: z.literal("Geometry"), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() }) });
export type TXubeGetComponentColorsResponse = z.infer<typeof XubeGetComponentColorsResponse>;
export const XubeSetComponentColorsRequest = z.object({ componentId: z.string(), colors: z.record(z.string().regex(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/)) });
export type TXubeSetComponentColorsRequest = z.infer<typeof XubeSetComponentColorsRequest>;
export const XubeSetComponentColorsResponse = z.object({ colors: z.object({ creator: z.string().optional(), componentId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }), entityId: z.string(), type: z.literal("GEOMETRY:COMPONENT:FACET:COLORS"), colors: z.record(z.string().regex(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/)), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("COLORS"), service: z.literal("Geometry"), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() }) });
export type TXubeSetComponentColorsResponse = z.infer<typeof XubeSetComponentColorsResponse>;
export const XubeDeleteComponentColorsRequest = z.object({ componentId: z.string() });
export type TXubeDeleteComponentColorsRequest = z.infer<typeof XubeDeleteComponentColorsRequest>;
export const XubeDeleteComponentColorsResponse = z.object({ deleted: z.boolean() });
export type TXubeDeleteComponentColorsResponse = z.infer<typeof XubeDeleteComponentColorsResponse>;
export const XubePushGeometrySyncRequest = z.object({  }).partial().passthrough();
export type TXubePushGeometrySyncRequest = z.infer<typeof XubePushGeometrySyncRequest>;
export const XubePushGeometrySyncResponse = z.object({  }).partial().passthrough();
export type TXubePushGeometrySyncResponse = z.infer<typeof XubePushGeometrySyncResponse>;
export const XubeGetDimensionsRequest = z.object({ versionId: z.string(), modelId: z.string() });
export type TXubeGetDimensionsRequest = z.infer<typeof XubeGetDimensionsRequest>;
export const XubeGetDimensionsResponse = z.object({ dimensions: z.object({ creator: z.string().optional(), modelId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }), length: z.number().gt(0), entityId: z.string(), type: z.literal("GEOMETRY:MODEL:FACET:DIMENSIONS"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("DIMENSIONS"), versionId: z.string(), unit: z.enum(["mm", "cm", "m", "in", "ft"]), service: z.literal("Geometry"), name: z.string().optional(), isGlobal: z.boolean().optional(), width: z.number().gt(0), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), height: z.number().gt(0) }) });
export type TXubeGetDimensionsResponse = z.infer<typeof XubeGetDimensionsResponse>;
export const XubeSetDimensionsRequest = z.object({ versionId: z.string(), unit: z.enum(["mm", "cm", "m", "in", "ft"]), modelId: z.string(), length: z.number().gt(0), width: z.number().gt(0), height: z.number().gt(0) });
export type TXubeSetDimensionsRequest = z.infer<typeof XubeSetDimensionsRequest>;
export const XubeSetDimensionsResponse = z.object({ dimensions: z.object({ creator: z.string().optional(), modelId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }), length: z.number().gt(0), entityId: z.string(), type: z.literal("GEOMETRY:MODEL:FACET:DIMENSIONS"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("DIMENSIONS"), versionId: z.string(), unit: z.enum(["mm", "cm", "m", "in", "ft"]), service: z.literal("Geometry"), name: z.string().optional(), isGlobal: z.boolean().optional(), width: z.number().gt(0), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), height: z.number().gt(0) }) });
export type TXubeSetDimensionsResponse = z.infer<typeof XubeSetDimensionsResponse>;
export const XubeDeleteDimensionsRequest = z.object({ versionId: z.string(), modelId: z.string() });
export type TXubeDeleteDimensionsRequest = z.infer<typeof XubeDeleteDimensionsRequest>;
export const XubeDeleteDimensionsResponse = z.object({ deleted: z.boolean() });
export type TXubeDeleteDimensionsResponse = z.infer<typeof XubeDeleteDimensionsResponse>;
export const XubeDeleteCadRequest = z.object({ cadId: z.string(), versionId: z.string(), modelId: z.string() });
export type TXubeDeleteCadRequest = z.infer<typeof XubeDeleteCadRequest>;
export const XubeDeleteCadResponse = z.object({ newPrimaryCadId: z.string().optional(), deleted: z.boolean() });
export type TXubeDeleteCadResponse = z.infer<typeof XubeDeleteCadResponse>;
export const XubeGetModelColorsRequest = z.object({ versionId: z.string(), modelId: z.string() });
export type TXubeGetModelColorsRequest = z.infer<typeof XubeGetModelColorsRequest>;
export const XubeGetModelColorsResponse = z.object({ colors: z.object({ creator: z.string().optional(), modelId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }), entityId: z.string(), type: z.literal("GEOMETRY:MODEL:FACET:COLORS"), colors: z.record(z.string().regex(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/)), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("COLORS"), versionId: z.string(), service: z.literal("Geometry"), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() }) });
export type TXubeGetModelColorsResponse = z.infer<typeof XubeGetModelColorsResponse>;
export const XubeSetModelColorsRequest = z.object({ versionId: z.string(), modelId: z.string(), colors: z.record(z.string().regex(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/)) });
export type TXubeSetModelColorsRequest = z.infer<typeof XubeSetModelColorsRequest>;
export const XubeSetModelColorsResponse = z.object({ colors: z.object({ creator: z.string().optional(), modelId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }), entityId: z.string(), type: z.literal("GEOMETRY:MODEL:FACET:COLORS"), colors: z.record(z.string().regex(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/)), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("COLORS"), versionId: z.string(), service: z.literal("Geometry"), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() }) });
export type TXubeSetModelColorsResponse = z.infer<typeof XubeSetModelColorsResponse>;
export const XubeDeleteModelColorsRequest = z.object({ versionId: z.string(), modelId: z.string() });
export type TXubeDeleteModelColorsRequest = z.infer<typeof XubeDeleteModelColorsRequest>;
export const XubeDeleteModelColorsResponse = z.object({ deleted: z.boolean() });
export type TXubeDeleteModelColorsResponse = z.infer<typeof XubeDeleteModelColorsResponse>;
export const XubeSetPrimaryCadRequest = z.object({ cadId: z.string(), versionId: z.string(), modelId: z.string() });
export type TXubeSetPrimaryCadRequest = z.infer<typeof XubeSetPrimaryCadRequest>;
export const XubeSetPrimaryCadResponse = z.object({ previousPrimaryCadId: z.string().optional(), cad: z.object({ sourceKey: z.string(), modelId: z.string(), copiedFromVersionId: z.string().optional(), type: z.literal("GEOMETRY:MODEL:FACET:CAD"), updater: z.string().optional(), bundleMapKey: z.string(), facetType: z.literal("CAD"), builtAt: z.string(), id: z.string().min(3), copiedFromCadId: z.string().optional(), cadId: z.string(), creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }), colorConfigurability: z.enum(["INHERENT", "IMMUTABLE", "CONFIGURABLE", "DERIVED"]), entityId: z.string(), metaKey: z.string(), label: z.string().optional(), contentHash: z.string(), accountId: z.string().optional(), builtBy: z.string(), versionId: z.string(), bundleKey: z.string(), service: z.literal("Geometry"), name: z.string().optional(), isGlobal: z.boolean().optional(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), primary: z.boolean() }) });
export type TXubeSetPrimaryCadResponse = z.infer<typeof XubeSetPrimaryCadResponse>;
export const XubeCommitCadRequest = z.object({ cadId: z.string(), versionId: z.string(), modelId: z.string(), contentHash: z.string() });
export type TXubeCommitCadRequest = z.infer<typeof XubeCommitCadRequest>;
export const XubeCommitCadResponse = z.object({ cad: z.object({ sourceKey: z.string(), modelId: z.string(), copiedFromVersionId: z.string().optional(), type: z.literal("GEOMETRY:MODEL:FACET:CAD"), updater: z.string().optional(), bundleMapKey: z.string(), facetType: z.literal("CAD"), builtAt: z.string(), id: z.string().min(3), copiedFromCadId: z.string().optional(), cadId: z.string(), creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }), colorConfigurability: z.enum(["INHERENT", "IMMUTABLE", "CONFIGURABLE", "DERIVED"]), entityId: z.string(), metaKey: z.string(), label: z.string().optional(), contentHash: z.string(), accountId: z.string().optional(), builtBy: z.string(), versionId: z.string(), bundleKey: z.string(), service: z.literal("Geometry"), name: z.string().optional(), isGlobal: z.boolean().optional(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), primary: z.boolean() }) });
export type TXubeCommitCadResponse = z.infer<typeof XubeCommitCadResponse>;
export const XubeListCadsRequest = z.object({ versionId: z.string(), modelId: z.string() });
export type TXubeListCadsRequest = z.infer<typeof XubeListCadsRequest>;
export const XubeListCadsResponse = z.object({ cads: z.array(z.object({ download: z.object({ sourceUrl: z.string().url(), bundleMapUrl: z.string().url(), bundleUrl: z.string().url(), metaUrl: z.string().url(), expiresAt: z.string() }), cad: z.object({ sourceKey: z.string(), modelId: z.string(), copiedFromVersionId: z.string().optional(), type: z.literal("GEOMETRY:MODEL:FACET:CAD"), updater: z.string().optional(), bundleMapKey: z.string(), facetType: z.literal("CAD"), builtAt: z.string(), id: z.string().min(3), copiedFromCadId: z.string().optional(), cadId: z.string(), creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }), colorConfigurability: z.enum(["INHERENT", "IMMUTABLE", "CONFIGURABLE", "DERIVED"]), entityId: z.string(), metaKey: z.string(), label: z.string().optional(), contentHash: z.string(), accountId: z.string().optional(), builtBy: z.string(), versionId: z.string(), bundleKey: z.string(), service: z.literal("Geometry"), name: z.string().optional(), isGlobal: z.boolean().optional(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), primary: z.boolean() }) })) });
export type TXubeListCadsResponse = z.infer<typeof XubeListCadsResponse>;
export const XubeAddCadRequest = z.object({ versionId: z.string(), modelId: z.string(), colorConfigurability: z.enum(["INHERENT", "IMMUTABLE", "CONFIGURABLE", "DERIVED"]), label: z.string().optional() });
export type TXubeAddCadRequest = z.infer<typeof XubeAddCadRequest>;
export const XubeAddCadResponse = z.object({ upload: z.object({ sourceUrl: z.string().url(), bundleMapUrl: z.string().url(), bundleUrl: z.string().url(), metaUrl: z.string().url(), expiresAt: z.string() }), cad: z.object({ sourceKey: z.string(), modelId: z.string(), copiedFromVersionId: z.string().optional(), type: z.literal("GEOMETRY:MODEL:FACET:CAD"), updater: z.string().optional(), bundleMapKey: z.string(), facetType: z.literal("CAD"), builtAt: z.string(), id: z.string().min(3), copiedFromCadId: z.string().optional(), cadId: z.string(), creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }), colorConfigurability: z.enum(["INHERENT", "IMMUTABLE", "CONFIGURABLE", "DERIVED"]), entityId: z.string(), metaKey: z.string(), label: z.string().optional(), contentHash: z.string(), accountId: z.string().optional(), builtBy: z.string(), versionId: z.string(), bundleKey: z.string(), service: z.literal("Geometry"), name: z.string().optional(), isGlobal: z.boolean().optional(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), primary: z.boolean() }) });
export type TXubeAddCadResponse = z.infer<typeof XubeAddCadResponse>;
export const XubeGetGroupChildrenRequest = z.object({ nextToken: z.string().optional(), limit: z.number().optional(), descending: z.boolean().optional().default(false), group: z.string() });
export type TXubeGetGroupChildrenRequest = z.infer<typeof XubeGetGroupChildrenRequest>;
export const XubeGetGroupChildrenResponse = z.object({ data: z.array(z.object({ parent: z.string(), componentType: z.string(), accountId: z.string().optional(), creator: z.string().optional(), created: z.string().datetime({ offset: true }).optional(), name: z.string().optional(), id: z.string().min(3), memberType: z.literal("CHILD"), type: z.string().min(3).optional(), child: z.string(), memberId: z.string() })), nextToken: z.string().optional() });
export type TXubeGetGroupChildrenResponse = z.infer<typeof XubeGetGroupChildrenResponse>;
export const XubeAddChildrenToGroupRequest = z.object({ children: z.array(z.string()), group: z.string() });
export type TXubeAddChildrenToGroupRequest = z.infer<typeof XubeAddChildrenToGroupRequest>;
export const XubeAddChildrenToGroupResponse = z.object({ success: z.boolean() });
export type TXubeAddChildrenToGroupResponse = z.infer<typeof XubeAddChildrenToGroupResponse>;
export const XubeRemoveChildrenFromGroupRequest = z.object({ children: z.array(z.string()), group: z.string() });
export type TXubeRemoveChildrenFromGroupRequest = z.infer<typeof XubeRemoveChildrenFromGroupRequest>;
export const XubeRemoveChildrenFromGroupResponse = z.object({ success: z.boolean() });
export type TXubeRemoveChildrenFromGroupResponse = z.infer<typeof XubeRemoveChildrenFromGroupResponse>;
export const XubeGetGroupRequest = z.object({ group: z.string() });
export type TXubeGetGroupRequest = z.infer<typeof XubeGetGroupRequest>;
export const XubeGroup = z.object({ componentType: z.literal("GROUP"), accountId: z.string().optional(), creator: z.string().optional(), created: z.string().datetime({ offset: true }).optional(), name: z.string().optional(), description: z.string().optional(), id: z.string().min(3), type: z.string().min(3).optional() });
export type TXubeGroup = z.infer<typeof XubeGroup>;
export const XubeUpdateGroupRequest = z.object({ name: z.string().optional(), group: z.string() });
export type TXubeUpdateGroupRequest = z.infer<typeof XubeUpdateGroupRequest>;
export const XubeUpdateGroupResponse = z.object({ id: z.string().min(3) });
export type TXubeUpdateGroupResponse = z.infer<typeof XubeUpdateGroupResponse>;
export const XubeGetAccountGroupsRequest = z.object({ nextToken: z.string().optional(), limit: z.number().optional(), descending: z.boolean().optional().default(false), account: z.string() });
export type TXubeGetAccountGroupsRequest = z.infer<typeof XubeGetAccountGroupsRequest>;
export const XubeGetAccountGroupsResponse = z.object({ data: z.array(z.object({ accountId: z.string().optional(), componentType: z.string(), facetType: z.literal("ACCOUNT"), creator: z.string().optional(), facetId: z.string().optional(), created: z.string().datetime({ offset: true }).optional(), groupId: z.string(), name: z.string().optional(), id: z.string().min(3), type: z.string().min(3).optional() })), nextToken: z.string().optional() });
export type TXubeGetAccountGroupsResponse = z.infer<typeof XubeGetAccountGroupsResponse>;
export const XubeCreateGroupRequest = z.object({ name: z.string(), description: z.string().optional(), account: z.string() });
export type TXubeCreateGroupRequest = z.infer<typeof XubeCreateGroupRequest>;
export const XubeCreateGroupResponse = z.object({ id: z.string().min(3) });
export type TXubeCreateGroupResponse = z.infer<typeof XubeCreateGroupResponse>;
export const XubePublishProductModelVersionRequest = z.object({ versionId: z.string(), modelId: z.string() });
export type TXubePublishProductModelVersionRequest = z.infer<typeof XubePublishProductModelVersionRequest>;
export const XubeProductModelVersion = z.object({ creator: z.string().optional(), allowsCyclicalChildConnections: z.boolean().optional(), modelId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), cloneFrom: z.string().optional(), description: z.string().optional(), changelog: z.array(z.string()).optional(), type: z.literal("PRODUCT:MODEL:VERSION"), updater: z.string().optional(), lifecycle: z.enum(["DRAFT", "ACTIVE", "INACTIVE"]), accountId: z.string().optional(), versionId: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubeProductModelVersion = z.infer<typeof XubeProductModelVersion>;
export const XubeGetProductModelVersionRequest = z.object({ versionId: z.string(), modelId: z.string() });
export type TXubeGetProductModelVersionRequest = z.infer<typeof XubeGetProductModelVersionRequest>;
export const XubeAllocateProductPartRequest = z.object({ productId: z.string(), childComponentId: z.string(), childEntryId: z.string() });
export type TXubeAllocateProductPartRequest = z.infer<typeof XubeAllocateProductPartRequest>;
export const XubeGetProductRequest = z.object({ productId: z.string() });
export type TXubeGetProductRequest = z.infer<typeof XubeGetProductRequest>;
export const XubeProduct = z.object({ componentType: z.literal("PRODUCT"), creator: z.string().optional(), serialNumber: z.string().optional(), allowsCyclicalChildConnections: z.boolean().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityType: z.literal("PRODUCT"), description: z.string().optional(), type: z.literal("PRODUCT:COMPONENT"), updater: z.string().optional(), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), service: z.literal("Product"), name: z.string().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), modelOrigin: z.object({ versionId: z.string(), modelId: z.string() }), slug: z.string().optional() });
export type TXubeProduct = z.infer<typeof XubeProduct>;
export const XubeUpdateProductRequest = z.object({ lifecycle: z.enum(["ACTIVE", "INACTIVE"]).optional(), serialNumber: z.string().optional(), productId: z.string(), name: z.string().optional(), description: z.string().optional() });
export type TXubeUpdateProductRequest = z.infer<typeof XubeUpdateProductRequest>;
export const XubeGetProductModelVersionsRequest = z.object({ modelId: z.string() });
export type TXubeGetProductModelVersionsRequest = z.infer<typeof XubeGetProductModelVersionsRequest>;
export const XubeProductModelVersions = z.array(z.object({ creator: z.string().optional(), allowsCyclicalChildConnections: z.boolean().optional(), modelId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), cloneFrom: z.string().optional(), description: z.string().optional(), changelog: z.array(z.string()).optional(), type: z.literal("PRODUCT:MODEL:VERSION"), updater: z.string().optional(), lifecycle: z.enum(["DRAFT", "ACTIVE", "INACTIVE"]), accountId: z.string().optional(), versionId: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() }));
export type TXubeProductModelVersions = z.infer<typeof XubeProductModelVersions>;
export const XubeCreateProductModelVersionRequest = z.object({ versionId: z.string().optional(), allowsCyclicalChildConnections: z.boolean().optional(), modelId: z.string(), name: z.string().optional(), cloneFrom: z.string().optional(), description: z.string().optional(), changelog: z.array(z.string()).optional(), id: z.string().optional() });
export type TXubeCreateProductModelVersionRequest = z.infer<typeof XubeCreateProductModelVersionRequest>;
export const XubeCreateProductModelVersionResponse = z.object({ creator: z.string().optional(), allowsCyclicalChildConnections: z.boolean().optional(), modelId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), cloneFrom: z.string().optional(), description: z.string().optional(), changelog: z.array(z.string()).optional(), type: z.literal("PRODUCT:MODEL:VERSION"), updater: z.string().optional(), lifecycle: z.enum(["DRAFT", "ACTIVE", "INACTIVE"]), accountId: z.string().optional(), versionId: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubeCreateProductModelVersionResponse = z.infer<typeof XubeCreateProductModelVersionResponse>;
export const XubeDeallocateProductPartRequest = z.object({ productId: z.string(), childComponentId: z.string() });
export type TXubeDeallocateProductPartRequest = z.infer<typeof XubeDeallocateProductPartRequest>;
export const XubeListProductModelsRequest = z.object({ accountId: z.string(), nextToken: z.string(), isGlobal: z.boolean(), limit: z.number(), descending: z.boolean().default(false) }).partial();
export type TXubeListProductModelsRequest = z.infer<typeof XubeListProductModelsRequest>;
export const XubeProductModels = z.array(z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityType: z.literal("PRODUCT"), description: z.string().optional(), modelType: z.literal("PRODUCT-MODEL"), type: z.literal("PRODUCT:MODEL"), updater: z.string().optional(), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), service: z.literal("Product"), name: z.string().optional(), isGlobal: z.boolean().optional(), derivedFrom: z.object({ versionId: z.string(), modelId: z.string() }).optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() }));
export type TXubeProductModels = z.infer<typeof XubeProductModels>;
export const XubeCreateProductModelRequest = z.object({ accountId: z.string().optional(), name: z.string(), isGlobal: z.boolean().optional(), description: z.string().optional(), id: z.string().optional() });
export type TXubeCreateProductModelRequest = z.infer<typeof XubeCreateProductModelRequest>;
export const XubeCreateProductModelResponse = z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityType: z.literal("PRODUCT"), description: z.string().optional(), modelType: z.literal("PRODUCT-MODEL"), type: z.literal("PRODUCT:MODEL"), updater: z.string().optional(), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), service: z.literal("Product"), name: z.string().optional(), isGlobal: z.boolean().optional(), derivedFrom: z.object({ versionId: z.string(), modelId: z.string() }).optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubeCreateProductModelResponse = z.infer<typeof XubeCreateProductModelResponse>;
export const XubeDeprecateProductModelVersionRequest = z.object({ versionId: z.string(), modelId: z.string() });
export type TXubeDeprecateProductModelVersionRequest = z.infer<typeof XubeDeprecateProductModelVersionRequest>;
export const XubeListProductsRequest = z.object({ accountId: z.string(), nextToken: z.string().optional(), limit: z.number().optional(), descending: z.boolean().optional().default(false) });
export type TXubeListProductsRequest = z.infer<typeof XubeListProductsRequest>;
export const XubeProducts = z.array(z.object({ componentType: z.literal("PRODUCT"), creator: z.string().optional(), serialNumber: z.string().optional(), allowsCyclicalChildConnections: z.boolean().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityType: z.literal("PRODUCT"), description: z.string().optional(), type: z.literal("PRODUCT:COMPONENT"), updater: z.string().optional(), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), service: z.literal("Product"), name: z.string().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), modelOrigin: z.object({ versionId: z.string(), modelId: z.string() }), slug: z.string().optional() }));
export type TXubeProducts = z.infer<typeof XubeProducts>;
export const XubeSetProductPlanRequest = z.object({ productId: z.string(), contentType: z.enum(["image/png", "image/jpeg", "image/webp"]) });
export type TXubeSetProductPlanRequest = z.infer<typeof XubeSetProductPlanRequest>;
export const XubeSetProductPlanResponse = z.object({ presignedUploadUrl: z.string().url() });
export type TXubeSetProductPlanResponse = z.infer<typeof XubeSetProductPlanResponse>;
export const XubeClearProductPlanRequest = z.object({ productId: z.string() });
export type TXubeClearProductPlanRequest = z.infer<typeof XubeClearProductPlanRequest>;
export const XubeGetProductStatusRequest = z.object({ productId: z.string() });
export type TXubeGetProductStatusRequest = z.infer<typeof XubeGetProductStatusRequest>;
export const XubeProductStatus = z.object({ reason: z.string().optional(), creator: z.string().optional(), componentId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("PRODUCT:COMPONENT:FACET:STATUS"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("STATUS"), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), status: z.enum(["PENDING", "ASSEMBLED", "SHIPPED"]) });
export type TXubeProductStatus = z.infer<typeof XubeProductStatus>;
export const XubeSetProductStatusRequest = z.object({ reason: z.string().optional(), productId: z.string(), status: z.enum(["PENDING", "ASSEMBLED", "SHIPPED"]) });
export type TXubeSetProductStatusRequest = z.infer<typeof XubeSetProductStatusRequest>;
export const XubeGetProductReadinessRequest = z.object({ productId: z.string() });
export type TXubeGetProductReadinessRequest = z.infer<typeof XubeGetProductReadinessRequest>;
export const XubeProductReadiness = z.object({ allocation: z.object({ declared: z.number().int().gte(0).lte(9007199254740991), arrived: z.number().int().gte(0).lte(9007199254740991), allocated: z.number().int().gte(0).lte(9007199254740991) }), unexpected: z.array(z.object({ childComponentId: z.string() })), missing: z.array(z.object({ childModelId: z.string(), childComponentId: z.string().optional(), childEntryId: z.string(), childVersionId: z.string().optional() })), matches: z.boolean() });
export type TXubeProductReadiness = z.infer<typeof XubeProductReadiness>;
export const XubeGetProductModelRequest = z.object({ modelId: z.string() });
export type TXubeGetProductModelRequest = z.infer<typeof XubeGetProductModelRequest>;
export const XubeProductModel = z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityType: z.literal("PRODUCT"), description: z.string().optional(), modelType: z.literal("PRODUCT-MODEL"), type: z.literal("PRODUCT:MODEL"), updater: z.string().optional(), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), service: z.literal("Product"), name: z.string().optional(), isGlobal: z.boolean().optional(), derivedFrom: z.object({ versionId: z.string(), modelId: z.string() }).optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubeProductModel = z.infer<typeof XubeProductModel>;
export const XubeUpdateProductModelRequest = z.object({ lifecycle: z.enum(["ACTIVE", "INACTIVE"]).optional(), modelId: z.string(), name: z.string().optional(), description: z.string().optional() });
export type TXubeUpdateProductModelRequest = z.infer<typeof XubeUpdateProductModelRequest>;
export const XubeGetProductPlanUrlRequest = z.object({ productId: z.string() });
export type TXubeGetProductPlanUrlRequest = z.infer<typeof XubeGetProductPlanUrlRequest>;
export const XubeGetProductPlanUrlResponse = z.object({ planUrl: z.string().url() });
export type TXubeGetProductPlanUrlResponse = z.infer<typeof XubeGetProductPlanUrlResponse>;
export const XubeCreateProductAtomicAccountEntityEntityFacetAccountRequest = z.object({ accountId: z.string(), creator: z.string().optional(), facetType: z.literal("ACCOUNT"), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), entityId: z.string(), id: z.string().min(3), type: z.literal("ENTITY:ENTITY:FACET:ACCOUNT"), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), updater: z.string().optional() });
export type TXubeCreateProductAtomicAccountEntityEntityFacetAccountRequest = z.infer<typeof XubeCreateProductAtomicAccountEntityEntityFacetAccountRequest>;
export const XubeCreateProductAtomicModelEntityComponentFacetModelRequest = z.object({ creator: z.string().optional(), componentId: z.string(), modelId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("ENTITY:COMPONENT:FACET:MODEL"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("MODEL"), versionId: z.string(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubeCreateProductAtomicModelEntityComponentFacetModelRequest = z.infer<typeof XubeCreateProductAtomicModelEntityComponentFacetModelRequest>;
export const XubeCreateProductAtomicStatusProductComponentFacetStatusRequest = z.object({ reason: z.string().optional(), creator: z.string().optional(), componentId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("PRODUCT:COMPONENT:FACET:STATUS"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("STATUS"), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), status: z.enum(["PENDING", "ASSEMBLED", "SHIPPED"]) });
export type TXubeCreateProductAtomicStatusProductComponentFacetStatusRequest = z.infer<typeof XubeCreateProductAtomicStatusProductComponentFacetStatusRequest>;
export const XubeCreateProductAtomicRequest = z.object({ componentType: z.literal("PRODUCT"), creator: z.string().optional(), serialNumber: z.string().optional(), allowsCyclicalChildConnections: z.boolean().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityType: z.literal("PRODUCT"), description: z.string().optional(), type: z.literal("PRODUCT:COMPONENT"), updater: z.string().optional(), facets: z.array(
                z.discriminatedUnion("facetType", [XubeCreateProductAtomicAccountEntityEntityFacetAccountRequest, XubeCreateProductAtomicModelEntityComponentFacetModelRequest, XubeCreateProductAtomicStatusProductComponentFacetStatusRequest])
            ), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), service: z.literal("Product"), name: z.string().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), modelOrigin: z.object({ versionId: z.string(), modelId: z.string() }), slug: z.string().optional() }).passthrough();
export type TXubeCreateProductAtomicRequest = z.infer<typeof XubeCreateProductAtomicRequest>;
export const XubeCreateProductAtomicResponse = z.object({ id: z.string().min(3) });
export type TXubeCreateProductAtomicResponse = z.infer<typeof XubeCreateProductAtomicResponse>;
export const XubeAssignProductToAccountRequest = z.object({ accountId: z.string(), productId: z.string() });
export type TXubeAssignProductToAccountRequest = z.infer<typeof XubeAssignProductToAccountRequest>;
export const XubeSiteRequest = z.object({ site: z.string() });
export type TXubeSiteRequest = z.infer<typeof XubeSiteRequest>;
export const XubeSite = z.object({ componentType: z.string(), creator: z.string().optional(), serialNumber: z.string().optional(), allowsCyclicalChildConnections: z.boolean().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityType: z.string(), icon: z.string().optional(), description: z.string().optional(), type: z.string(), updater: z.string().optional(), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), service: z.string().optional(), name: z.string().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), config: z.object({ inheritFromParent: z.boolean(), overrides: z.object({}).partial().passthrough() }).partial().passthrough().optional(), modelOrigin: z.object({ versionId: z.string(), modelId: z.string() }), slug: z.string().optional(), siteType: z.enum(["solar", "warehouse", "office", "factory", "datacenter", "other"]).optional() });
export type TXubeSite = z.infer<typeof XubeSite>;
export const XubeUpdateSiteRequest = z.object({ lifecycle: z.enum(["ACTIVE", "INACTIVE"]).optional(), site: z.string(), parentSiteId: z.string().optional(), name: z.string().optional(), icon: z.string().optional(), description: z.string().optional(), config: z.object({ inheritFromParent: z.boolean(), overrides: z.object({}).partial().passthrough() }).partial().passthrough().optional(), siteType: z.enum(["solar", "warehouse", "office", "factory", "datacenter", "other"]).optional() });
export type TXubeUpdateSiteRequest = z.infer<typeof XubeUpdateSiteRequest>;
export const XubeSetSitePlacementRequest = z.object({ site: z.string(), x: z.number().gte(0).lte(100), y: z.number().gte(0).lte(100), z: z.number().optional() });
export type TXubeSetSitePlacementRequest = z.infer<typeof XubeSetSitePlacementRequest>;
export const XubeSiteAccount = z.object({ componentType: z.literal("SITE").optional(), creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("ENTITY:ENTITY:FACET:ACCOUNT"), updater: z.string().optional(), accountId: z.string(), facetType: z.literal("ACCOUNT"), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), siteId: z.string().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubeSiteAccount = z.infer<typeof XubeSiteAccount>;
export const XubeGetSitePlanRequest = z.object({ site: z.string() });
export type TXubeGetSitePlanRequest = z.infer<typeof XubeGetSitePlanRequest>;
export const XubeSitePlan = z.object({ componentType: z.literal("SITE").optional(), creator: z.string().optional(), componentId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), planUrl: z.string().url(), entityId: z.string(), type: z.literal("ENTITY:COMPONENT:FACET:PLAN"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("PLAN"), s3Key: z.string(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), siteId: z.string(), uploadedAt: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), contentType: z.string() });
export type TXubeSitePlan = z.infer<typeof XubeSitePlan>;
export const XubeSetSitePlanRequest = z.object({ site: z.string(), contentType: z.enum(["image/png", "image/jpeg", "image/webp"]) });
export type TXubeSetSitePlanRequest = z.infer<typeof XubeSetSitePlanRequest>;
export const XubeSetSitePlanResponse = z.object({ planUrl: z.string().url(), presignedUploadUrl: z.string().url() });
export type TXubeSetSitePlanResponse = z.infer<typeof XubeSetSitePlanResponse>;
export const XubeClearSitePlanRequest = z.object({ site: z.string() });
export type TXubeClearSitePlanRequest = z.infer<typeof XubeClearSitePlanRequest>;
export const XubeGetSubsitesRequest = z.object({ site: z.string(), nextToken: z.string().optional(), limit: z.number().optional(), descending: z.boolean().optional().default(false) });
export type TXubeGetSubsitesRequest = z.infer<typeof XubeGetSubsitesRequest>;
export const XubeSites = z.object({ data: z.array(z.object({ componentType: z.string(), creator: z.string().optional(), serialNumber: z.string().optional(), allowsCyclicalChildConnections: z.boolean().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityType: z.string(), icon: z.string().optional(), description: z.string().optional(), type: z.string(), updater: z.string().optional(), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), service: z.string().optional(), name: z.string().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), config: z.object({ inheritFromParent: z.boolean(), overrides: z.object({}).partial().passthrough() }).partial().passthrough().optional(), modelOrigin: z.object({ versionId: z.string(), modelId: z.string() }), slug: z.string().optional(), siteType: z.enum(["solar", "warehouse", "office", "factory", "datacenter", "other"]).optional() })), nextToken: z.string().optional() });
export type TXubeSites = z.infer<typeof XubeSites>;
export const XubeGetSitesRequest = z.object({ sites: z.array(z.string()) });
export type TXubeGetSitesRequest = z.infer<typeof XubeGetSitesRequest>;
export const XubeCreateSiteRequest = z.object({ versionId: z.string().min(1), parentSiteId: z.string().optional(), modelId: z.string().min(1), latitude: z.number().gte(-90).lte(90), name: z.string().min(1).max(100), icon: z.string().optional(), description: z.string().optional(), config: z.object({ inheritFromParent: z.boolean(), overrides: z.object({}).partial().passthrough() }).partial().passthrough().optional(), account: z.string(), siteType: z.enum(["solar", "warehouse", "office", "factory", "datacenter", "other"]), longitude: z.number().gte(-180).lte(180) });
export type TXubeCreateSiteRequest = z.infer<typeof XubeCreateSiteRequest>;
export const XubeCreateSiteResponse = z.object({ id: z.string().min(3) });
export type TXubeCreateSiteResponse = z.infer<typeof XubeCreateSiteResponse>;
export const XubeGetSiteLocationRequest = z.object({ site: z.string() });
export type TXubeGetSiteLocationRequest = z.infer<typeof XubeGetSiteLocationRequest>;
export const XubeSiteLocation = z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), latitude: z.number().gte(-90).lte(90), entityId: z.string(), type: z.literal("ENTITY:COMPONENT:FACET:LOCATION"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("LOCATION"), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), longitude: z.number().gte(-180).lte(180) });
export type TXubeSiteLocation = z.infer<typeof XubeSiteLocation>;
export const XubeSetSiteLocationRequest = z.object({ site: z.string(), latitude: z.number().gte(-90).lte(90), longitude: z.number().gte(-180).lte(180) });
export type TXubeSetSiteLocationRequest = z.infer<typeof XubeSetSiteLocationRequest>;
export const XubeClearSiteLocationRequest = z.object({ site: z.string() });
export type TXubeClearSiteLocationRequest = z.infer<typeof XubeClearSiteLocationRequest>;
export const XubeSetSiteLayoutRequest = z.object({ site: z.string(), canvas: z.enum(["MAP", "PLAN"]), positions: z.record(z.object({ x: z.number(), y: z.number() })) });
export type TXubeSetSiteLayoutRequest = z.infer<typeof XubeSetSiteLayoutRequest>;
export const XubeMoveSiteRequest = z.object({ site: z.string(), parentSiteId: z.string().optional() });
export type TXubeMoveSiteRequest = z.infer<typeof XubeMoveSiteRequest>;
export const XubeAccountSitesRequest = z.object({ nextToken: z.string().optional(), limit: z.number().optional(), account: z.string(), descending: z.boolean().optional().default(false) });
export type TXubeAccountSitesRequest = z.infer<typeof XubeAccountSitesRequest>;
export const XubeAccountSites = z.object({ data: z.array(z.object({ componentType: z.literal("SITE").optional(), creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("ENTITY:ENTITY:FACET:ACCOUNT"), updater: z.string().optional(), accountId: z.string(), facetType: z.literal("ACCOUNT"), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), siteId: z.string().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() })), nextToken: z.string().optional() });
export type TXubeAccountSites = z.infer<typeof XubeAccountSites>;
export const XubeAssignSitesToAccountRequest = z.object({ sites: z.array(z.string()), account: z.string() });
export type TXubeAssignSitesToAccountRequest = z.infer<typeof XubeAssignSitesToAccountRequest>;
export const XubeCreateSiteAtomicAccountEntityEntityFacetAccountRequest = z.object({ accountId: z.string(), creator: z.string().optional(), facetType: z.literal("ACCOUNT"), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), entityId: z.string(), id: z.string().min(3), type: z.literal("ENTITY:ENTITY:FACET:ACCOUNT"), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), updater: z.string().optional() });
export type TXubeCreateSiteAtomicAccountEntityEntityFacetAccountRequest = z.infer<typeof XubeCreateSiteAtomicAccountEntityEntityFacetAccountRequest>;
export const XubeCreateSiteAtomicLocationEntityComponentFacetLocationRequest = z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), latitude: z.number().gte(-90).lte(90), entityId: z.string(), type: z.literal("ENTITY:COMPONENT:FACET:LOCATION"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("LOCATION"), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), longitude: z.number().gte(-180).lte(180) });
export type TXubeCreateSiteAtomicLocationEntityComponentFacetLocationRequest = z.infer<typeof XubeCreateSiteAtomicLocationEntityComponentFacetLocationRequest>;
export const XubeCreateSiteAtomicChildEntityComponentFacetChildRequest = z.object({ creator: z.string().optional(), componentId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), origin: z.object({ versionId: z.string(), modelId: z.string() }).optional(), extendableSetId: z.string().min(1).optional(), entityId: z.string(), originChildEntryId: z.string().optional(), type: z.literal("ENTITY:COMPONENT:FACET:CHILD"), childId: z.string(), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("CHILD"), exposure: z.enum(["INTERNAL", "EXTERNAL", "BOUNDARY"]).optional(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubeCreateSiteAtomicChildEntityComponentFacetChildRequest = z.infer<typeof XubeCreateSiteAtomicChildEntityComponentFacetChildRequest>;
export const XubeCreateSiteAtomicRequest = z.object({ componentType: z.string(), creator: z.string().optional(), serialNumber: z.string().optional(), allowsCyclicalChildConnections: z.boolean().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityType: z.string(), icon: z.string().optional(), description: z.string().optional(), type: z.string(), updater: z.string().optional(), facets: z.array(
                z.discriminatedUnion("facetType", [XubeCreateSiteAtomicAccountEntityEntityFacetAccountRequest, XubeCreateSiteAtomicLocationEntityComponentFacetLocationRequest, XubeCreateSiteAtomicChildEntityComponentFacetChildRequest])
            ), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), service: z.string().optional(), name: z.string().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), config: z.object({ inheritFromParent: z.boolean(), overrides: z.object({}).partial().passthrough() }).partial().passthrough().optional(), modelOrigin: z.object({ versionId: z.string(), modelId: z.string() }), slug: z.string().optional(), siteType: z.enum(["solar", "warehouse", "office", "factory", "datacenter", "other"]).optional() }).passthrough();
export type TXubeCreateSiteAtomicRequest = z.infer<typeof XubeCreateSiteAtomicRequest>;
export const XubeCreateSiteAtomicResponse = z.object({ id: z.string() });
export type TXubeCreateSiteAtomicResponse = z.infer<typeof XubeCreateSiteAtomicResponse>;
export const XubeSystemRequest = z.object({ system: z.string() });
export type TXubeSystemRequest = z.infer<typeof XubeSystemRequest>;
export const XubeSystem = z.object({ componentType: z.string(), creator: z.string().optional(), serialNumber: z.string().optional(), allowsCyclicalChildConnections: z.boolean().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityType: z.string(), icon: z.string().optional(), description: z.string().optional(), type: z.string(), updater: z.string().optional(), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), service: z.string().optional(), name: z.string().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), config: z.object({ inheritFromParent: z.boolean(), overrides: z.object({}).partial().passthrough() }).partial().passthrough().optional(), modelOrigin: z.object({ versionId: z.string(), modelId: z.string() }), slug: z.string().optional() });
export type TXubeSystem = z.infer<typeof XubeSystem>;
export const XubeUpdateSystemRequest = z.object({ lifecycle: z.enum(["ACTIVE", "INACTIVE"]).optional(), system: z.string(), parentSystemId: z.string().optional(), parentSiteId: z.string().optional(), name: z.string().optional(), icon: z.string().optional(), description: z.string().optional(), config: z.object({ inheritFromParent: z.boolean(), overrides: z.object({}).partial().passthrough() }).partial().passthrough().optional() });
export type TXubeUpdateSystemRequest = z.infer<typeof XubeUpdateSystemRequest>;
export const XubeSetSystemPlacementRequest = z.object({ system: z.string(), x: z.number().gte(0).lte(100), y: z.number().gte(0).lte(100), z: z.number().optional() });
export type TXubeSetSystemPlacementRequest = z.infer<typeof XubeSetSystemPlacementRequest>;
export const XubeSystems = z.array(z.object({ componentType: z.string(), creator: z.string().optional(), serialNumber: z.string().optional(), allowsCyclicalChildConnections: z.boolean().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityType: z.string(), icon: z.string().optional(), description: z.string().optional(), type: z.string(), updater: z.string().optional(), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), service: z.string().optional(), name: z.string().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), config: z.object({ inheritFromParent: z.boolean(), overrides: z.object({}).partial().passthrough() }).partial().passthrough().optional(), modelOrigin: z.object({ versionId: z.string(), modelId: z.string() }), slug: z.string().optional() }));
export type TXubeSystems = z.infer<typeof XubeSystems>;
export const XubeSetSystemLocationRequest = z.object({ system: z.string(), latitude: z.number().gte(-90).lte(90), longitude: z.number().gte(-180).lte(180) });
export type TXubeSetSystemLocationRequest = z.infer<typeof XubeSetSystemLocationRequest>;
export const XubeSystemAccount = z.object({ componentType: z.literal("SYSTEM").optional(), creator: z.string().optional(), systemId: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("ENTITY:ENTITY:FACET:ACCOUNT"), updater: z.string().optional(), accountId: z.string(), facetType: z.literal("ACCOUNT"), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubeSystemAccount = z.infer<typeof XubeSystemAccount>;
export const XubeAccountSystemsRequest = z.object({ nextToken: z.string().optional(), limit: z.number().optional(), account: z.string(), descending: z.boolean().optional().default(false) });
export type TXubeAccountSystemsRequest = z.infer<typeof XubeAccountSystemsRequest>;
export const XubeAccountSystems = z.object({ data: z.array(z.object({ componentType: z.literal("SYSTEM").optional(), creator: z.string().optional(), systemId: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("ENTITY:ENTITY:FACET:ACCOUNT"), updater: z.string().optional(), accountId: z.string(), facetType: z.literal("ACCOUNT"), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() })), nextToken: z.string().optional() });
export type TXubeAccountSystems = z.infer<typeof XubeAccountSystems>;
export const XubeAssignSystemsToAccountRequest = z.object({ systems: z.array(z.string()), account: z.string() });
export type TXubeAssignSystemsToAccountRequest = z.infer<typeof XubeAssignSystemsToAccountRequest>;
export const XubeCreateSystemAtomicAccountEntityEntityFacetAccountRequest = z.object({ accountId: z.string(), creator: z.string().optional(), facetType: z.literal("ACCOUNT"), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), entityId: z.string(), id: z.string().min(3), type: z.literal("ENTITY:ENTITY:FACET:ACCOUNT"), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), updater: z.string().optional() });
export type TXubeCreateSystemAtomicAccountEntityEntityFacetAccountRequest = z.infer<typeof XubeCreateSystemAtomicAccountEntityEntityFacetAccountRequest>;
export const XubeCreateSystemAtomicChildEntityComponentFacetChildRequest = z.object({ creator: z.string().optional(), componentId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), origin: z.object({ versionId: z.string(), modelId: z.string() }).optional(), extendableSetId: z.string().min(1).optional(), entityId: z.string(), originChildEntryId: z.string().optional(), type: z.literal("ENTITY:COMPONENT:FACET:CHILD"), childId: z.string(), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("CHILD"), exposure: z.enum(["INTERNAL", "EXTERNAL", "BOUNDARY"]).optional(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional() });
export type TXubeCreateSystemAtomicChildEntityComponentFacetChildRequest = z.infer<typeof XubeCreateSystemAtomicChildEntityComponentFacetChildRequest>;
export const XubeCreateSystemAtomicRequest = z.object({ componentType: z.string(), creator: z.string().optional(), serialNumber: z.string().optional(), allowsCyclicalChildConnections: z.boolean().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityType: z.string(), icon: z.string().optional(), description: z.string().optional(), type: z.string(), updater: z.string().optional(), facets: z.array(
                z.discriminatedUnion("facetType", [XubeCreateSystemAtomicAccountEntityEntityFacetAccountRequest, XubeCreateSystemAtomicChildEntityComponentFacetChildRequest])
            ), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), service: z.string().optional(), name: z.string().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), config: z.object({ inheritFromParent: z.boolean(), overrides: z.object({}).partial().passthrough() }).partial().passthrough().optional(), modelOrigin: z.object({ versionId: z.string(), modelId: z.string() }), slug: z.string().optional() }).passthrough();
export type TXubeCreateSystemAtomicRequest = z.infer<typeof XubeCreateSystemAtomicRequest>;
export const XubeCreateSystemAtomicResponse = z.object({ id: z.string() });
export type TXubeCreateSystemAtomicResponse = z.infer<typeof XubeCreateSystemAtomicResponse>;
export const XubeGetSystemPlanRequest = z.object({ system: z.string() });
export type TXubeGetSystemPlanRequest = z.infer<typeof XubeGetSystemPlanRequest>;
export const XubeSystemPlan = z.object({ componentType: z.literal("SYSTEM").optional(), creator: z.string().optional(), systemId: z.string(), componentId: z.string(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), planUrl: z.string().url(), entityId: z.string(), type: z.literal("ENTITY:COMPONENT:FACET:PLAN"), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("PLAN"), s3Key: z.string(), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), uploadedAt: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), contentType: z.string() });
export type TXubeSystemPlan = z.infer<typeof XubeSystemPlan>;
export const XubeSetSystemPlanRequest = z.object({ system: z.string(), contentType: z.enum(["image/png", "image/jpeg", "image/webp"]) });
export type TXubeSetSystemPlanRequest = z.infer<typeof XubeSetSystemPlanRequest>;
export const XubeSetSystemPlanResponse = z.object({ planUrl: z.string().url(), presignedUploadUrl: z.string().url() });
export type TXubeSetSystemPlanResponse = z.infer<typeof XubeSetSystemPlanResponse>;
export const XubeClearSystemPlanRequest = z.object({ system: z.string() });
export type TXubeClearSystemPlanRequest = z.infer<typeof XubeClearSystemPlanRequest>;
export const XubeGetSystemsRequest = z.object({ systems: z.array(z.string()) });
export type TXubeGetSystemsRequest = z.infer<typeof XubeGetSystemsRequest>;
export const XubeCreateSystemRequest = z.object({ versionId: z.string().min(1), parentSystemId: z.string().optional(), parentSiteId: z.string().optional(), modelId: z.string().min(1), name: z.string().min(1).max(100), icon: z.string().optional(), description: z.string().optional(), config: z.object({ inheritFromParent: z.boolean(), overrides: z.object({}).partial().passthrough() }).partial().passthrough().optional(), account: z.string() });
export type TXubeCreateSystemRequest = z.infer<typeof XubeCreateSystemRequest>;
export const XubeCreateSystemResponse = z.object({ id: z.string().min(3) });
export type TXubeCreateSystemResponse = z.infer<typeof XubeCreateSystemResponse>;
export const XubeGetTransactionCountsByDevicesRequest = z.object({ devices: z.array(z.string()).min(1).max(100), from: z.string(), to: z.string(), groupBy: z.enum(["date", "weekday", "month", "year"]).optional().default("date") });
export type TXubeGetTransactionCountsByDevicesRequest = z.infer<typeof XubeGetTransactionCountsByDevicesRequest>;
export const XubeGetTransactionCountsByDevicesResponse = z.object({ data: z.record(z.record(z.record(z.number()))) });
export type TXubeGetTransactionCountsByDevicesResponse = z.infer<typeof XubeGetTransactionCountsByDevicesResponse>;
export const XubeGetDevicesTransactionCountsRequest = z.object({ from: z.string(), to: z.string(), groupBy: z.enum(["date", "weekday", "month", "year"]).optional().default("date"), account: z.string() });
export type TXubeGetDevicesTransactionCountsRequest = z.infer<typeof XubeGetDevicesTransactionCountsRequest>;
export const XubeGetDevicesTransactionCountsResponse = z.object({ data: z.record(z.record(z.number())) });
export type TXubeGetDevicesTransactionCountsResponse = z.infer<typeof XubeGetDevicesTransactionCountsResponse>;
export const XubeGetAccountTransactionCountsRequest = z.object({ from: z.string(), to: z.string(), groupBy: z.enum(["date", "weekday", "month", "year"]).optional().default("date"), account: z.string() });
export type TXubeGetAccountTransactionCountsRequest = z.infer<typeof XubeGetAccountTransactionCountsRequest>;
export const XubeGetAccountTransactionCountsResponse = z.object({ data: z.array(z.object({ projected: z.object({ dataTransferCount: z.number(), from: z.string(), to: z.string() }).optional(), current: z.object({ dataTransferCount: z.number(), from: z.string(), to: z.string() }) })) });
export type TXubeGetAccountTransactionCountsResponse = z.infer<typeof XubeGetAccountTransactionCountsResponse>;
export const XubeGetDeviceTransactionCountsRequest = z.object({ from: z.string(), to: z.string(), groupBy: z.enum(["date", "weekday", "month", "year"]).optional().default("date"), device: z.string(), account: z.string() });
export type TXubeGetDeviceTransactionCountsRequest = z.infer<typeof XubeGetDeviceTransactionCountsRequest>;
export const XubeGetDeviceTransactionCountsResponse = z.object({ data: z.record(z.record(z.number())) });
export type TXubeGetDeviceTransactionCountsResponse = z.infer<typeof XubeGetDeviceTransactionCountsResponse>;
export const XubeSignUpRequest = z.object({ password: z.string(), email: z.string() });
export type TXubeSignUpRequest = z.infer<typeof XubeSignUpRequest>;
export const XubeSignUpResponse = z.object({ id: z.string().min(3) });
export type TXubeSignUpResponse = z.infer<typeof XubeSignUpResponse>;
export const XubeForgotPasswordRequest = z.object({ email: z.string() });
export type TXubeForgotPasswordRequest = z.infer<typeof XubeForgotPasswordRequest>;
export const XubePasswordResetResponse = z.object({ success: z.boolean() });
export type TXubePasswordResetResponse = z.infer<typeof XubePasswordResetResponse>;
export const XubeRefreshRequest = z.object({ refreshToken: z.string() });
export type TXubeRefreshRequest = z.infer<typeof XubeRefreshRequest>;
export const XubeRefreshResponse = z.object({ idToken: z.string(), token: z.string() });
export type TXubeRefreshResponse = z.infer<typeof XubeRefreshResponse>;
export const XubeLogInRequest = z.object({ password: z.string(), email: z.string() });
export type TXubeLogInRequest = z.infer<typeof XubeLogInRequest>;
export const XubeLogInResponse = z.object({ idToken: z.string(), token: z.string(), refreshToken: z.string() });
export type TXubeLogInResponse = z.infer<typeof XubeLogInResponse>;
export const XubeConfirmResetPasswordRequest = z.object({ code: z.string(), newPassword: z.string(), email: z.string() });
export type TXubeConfirmResetPasswordRequest = z.infer<typeof XubeConfirmResetPasswordRequest>;
export const XubeGetUserRequest = z.object({ user: z.string().email() });
export type TXubeGetUserRequest = z.infer<typeof XubeGetUserRequest>;
export const XubeUser = z.object({ deleted: z.string().datetime({ offset: true }).optional(), v: z.string(), created: z.string().datetime({ offset: true }), name: z.string(), id: z.string().min(3), email: z.string().email() }).passthrough();
export type TXubeUser = z.infer<typeof XubeUser>;

export const endpoints = makeApi([
  {
    method: "get",
    path: "/accounts/",
    alias: "Get Accounts",
    description: `Get all accounts. Actions: Account:GetAccounts`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({  }).partial()
      },
    ],
    response: XubeGetAccountsResponse,
  },
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
        schema: XubeCreateAccountRequest
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
        schema: z.object({ account: z.string() })
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
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
        schema: XubeGetAccountAvatarUploadUrlRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
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
        schema: z.object({ account: z.string() })
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
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
        schema: XubeCreateApiKeyRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
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
        schema: XubeGetAccountApiKeyRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
      {
        name: "key",
        type: "Path",
        schema: z.string()
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
        schema: XubeRemoveApiKeyRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
      {
        name: "key",
        type: "Path",
        schema: z.string()
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
        schema: XubeUpdateApiKeyRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
      {
        name: "key",
        type: "Path",
        schema: z.string()
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
        schema: XubeSubscribeToAccountRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
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
        schema: XubeSubscribeToAccountRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
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
        schema: z.object({ account: z.string() })
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
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
        schema: XubeAddUserToAccountRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
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
        schema: XubeGetAccountUserRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
      {
        name: "user",
        type: "Path",
        schema: z.string()
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
        schema: XubeRemoveUserFromAccountRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
      {
        name: "user",
        type: "Path",
        schema: z.string()
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
        schema: XubeGetUserAccountsRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
      {
        name: "user",
        type: "Path",
        schema: z.string()
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
        schema: XubeSetAccountUserPermissionsRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
      {
        name: "user",
        type: "Path",
        schema: z.string()
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
        schema: XubeCheckAccountUserPermissionsRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
      {
        name: "user",
        type: "Path",
        schema: z.string()
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
        schema: XubeSubscribeToUserAccountsRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
      {
        name: "user",
        type: "Path",
        schema: z.string()
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
        schema: XubeSubscribeToUserAccountsRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
      {
        name: "user",
        type: "Path",
        schema: z.string()
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
        schema: XubeSubscribeToAccountRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
      {
        name: "user",
        type: "Path",
        schema: z.string()
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
        schema: XubeSubscribeToAccountRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
      {
        name: "user",
        type: "Path",
        schema: z.string()
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
        schema: XubeSubscribeToAccountRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
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
        schema: XubeSubscribeToAccountRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
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
        schema: z.object({ apiKey: z.string() })
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
        schema: XubeGetUserAccountsRequest
      },
      {
        name: "user",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ data: z.array(z.object({ creator: z.string().optional(), created: z.string().datetime({ offset: true }), v: z.string(), roles: z.array(z.string()), name: z.string().optional(), id: z.string().min(3), type: z.string().min(3).optional(), user: z.string().optional(), account: z.string().regex(/^[a-zA-Z0-9-_ ]+$/), email: z.string() })), nextToken: z.string().optional() }).passthrough(),
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
        schema: XubeSubscribeToUserAccountsRequest
      },
      {
        name: "user",
        type: "Path",
        schema: z.string()
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
        schema: XubeSubscribeToUserAccountsRequest
      },
      {
        name: "user",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "post",
    path: "/auth/confirm-forgot-password",
    alias: "Confirm forgot password",
    description: `Confirm password reset with verification code. Actions: user:ConfirmResetPassword`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeConfirmResetPasswordRequest
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "post",
    path: "/auth/forgot-password",
    alias: "Forgot password",
    description: `Initiate forgot password flow. Actions: user:ForgotPassword`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ email: z.string() })
      },
    ],
    response: z.object({ success: z.boolean() }),
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
        schema: XubeLogInRequest
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
        schema: z.object({ refreshToken: z.string() })
      },
    ],
    response: XubeRefreshResponse,
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
        schema: XubeSignUpRequest
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
        schema: XubeCreateComponentRequest
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
        schema: z.object({ component: z.string() })
      },
      {
        name: "component",
        type: "Path",
        schema: z.string()
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
        schema: XubeGetChildrenRequest
      },
      {
        name: "COMPONENT_TYPE_FIELD",
        type: "Query",
        schema: z.string().optional()
      },
      {
        name: "component",
        type: "Path",
        schema: z.string()
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
        schema: XubeAddChildrenRequest
      },
      {
        name: "component",
        type: "Path",
        schema: z.string()
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
        schema: XubeRemoveChildrenRequest
      },
      {
        name: "component",
        type: "Path",
        schema: z.string()
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
        schema: XubeSubscribeToChildrenRequest
      },
      {
        name: "COMPONENT_TYPE_FIELD",
        type: "Query",
        schema: z.string().optional()
      },
      {
        name: "component",
        type: "Path",
        schema: z.string()
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
        schema: XubeSubscribeToChildrenRequest
      },
      {
        name: "COMPONENT_TYPE_FIELD",
        type: "Query",
        schema: z.string().optional()
      },
      {
        name: "component",
        type: "Path",
        schema: z.string()
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
        schema: XubeGetParentsRequest
      },
      {
        name: "COMPONENT_TYPE_FIELD",
        type: "Query",
        schema: z.string().optional()
      },
      {
        name: "component",
        type: "Path",
        schema: z.string()
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
        schema: z.array(z.object({ parent: z.string(), creator: z.string().optional(), created: z.string().datetime({ offset: true }).optional(), name: z.string().optional(), id: z.string().min(3), type: z.string().min(3).optional(), child: z.string() }).passthrough())
      },
      {
        name: "COMPONENT_TYPE_FIELD",
        type: "Query",
        schema: z.string().optional()
      },
      {
        name: "component",
        type: "Path",
        schema: z.string()
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
        schema: z.array(z.object({ parent: z.string(), creator: z.string().optional(), created: z.string().datetime({ offset: true }).optional(), name: z.string().optional(), id: z.string().min(3), type: z.string().min(3).optional(), child: z.string() }).passthrough())
      },
      {
        name: "COMPONENT_TYPE_FIELD",
        type: "Query",
        schema: z.string().optional()
      },
      {
        name: "component",
        type: "Path",
        schema: z.string()
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
        schema: XubeGetAccountComponentsRequest
      },
      {
        name: "componentType",
        type: "Query",
        schema: z.string().optional()
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
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
        schema: XubeSubscribeToAccountComponentsRequest
      },
      {
        name: "componentType",
        type: "Query",
        schema: z.string().optional()
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
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
        schema: XubeSubscribeToAccountComponentsRequest
      },
      {
        name: "componentType",
        type: "Query",
        schema: z.string().optional()
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
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
        schema: XubeCreateDashboardRequest
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
        schema: z.object({ dashboard: z.string() })
      },
      {
        name: "dashboard",
        type: "Path",
        schema: z.string()
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
        schema: XubeUpdateDashboardRequest
      },
      {
        name: "dashboard",
        type: "Path",
        schema: z.string()
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
        schema: z.object({ account: z.string() })
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
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
        schema: XubeGetFavouriteDashboardsRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
      {
        name: "user",
        type: "Path",
        schema: z.string()
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
        schema: XubeSetDashboardsAsFavouriteRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
      {
        name: "user",
        type: "Path",
        schema: z.string()
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
        schema: XubeSetDashboardsAsFavouriteRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
      {
        name: "user",
        type: "Path",
        schema: z.string()
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
        schema: z.object({ account: z.string() })
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
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
        schema: XubeSubscribeToCurrentDataDestinationRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
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
        schema: XubeSubscribeToCurrentDataDestinationRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
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
        schema: XubeSubscribeToDataRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
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
        schema: XubeConfirmDestinationRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
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
        schema: z.object({ account: z.string() })
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ destination: z.string() }),
  },
  {
    method: "post",
    path: "/destinations/",
    alias: "Create Destination",
    description: `Create a new destination. Actions: Destination:CreateDestination`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeCreateDestinationRequest
      },
    ],
    response: z.object({ id: z.string().min(3) }),
  },
  {
    method: "get",
    path: "/destinations/:destination",
    alias: "Get Destination",
    description: `Get a specific destination. Actions: Destination:GetDestination`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ destination: z.string() })
      },
      {
        name: "destination",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeGetDestinationResponse,
  },
  {
    method: "delete",
    path: "/destinations/:destination",
    alias: "Delete Destination",
    description: `Delete a destination. Actions: Destination:DeleteDestination`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ destination: z.string() })
      },
      {
        name: "destination",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "patch",
    path: "/destinations/:destination",
    alias: "Update Destination",
    description: `Update a destination. Actions: Destination:UpdateDestination`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeUpdateDestinationRequest
      },
      {
        name: "destination",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "post",
    path: "/destinations/:destination/confirmation",
    alias: "Confirm Destination1",
    description: `Confirm a destination using the confirmation token. Actions: Destination:ConfirmDestination`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeConfirmDestinationRequest1
      },
      {
        name: "destination",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "post",
    path: "/destinations/:destination/confirmation/data",
    alias: "Confirm Data Destination",
    description: `Confirm an IoT destination using the confirmation token. Actions: Destination:ConfirmDestination`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeConfirmDataDestinationRequest
      },
      {
        name: "destination",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "post",
    path: "/destinations/:destination/confirmation/send",
    alias: "Send Confirmation To Destination",
    description: `Send confirmation to a destination. Actions: Destination:SendConfirmationToDestination`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ destination: z.string() })
      },
      {
        name: "destination",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "post",
    path: "/destinations/:destination/confirmation/send/data",
    alias: "Send Confirmation To Data Destination",
    description: `Send confirmation to a data destination. Actions: Destination:SendConfirmationToDestination`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ destination: z.string() })
      },
      {
        name: "destination",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "get",
    path: "/destinations/:destination/subscriptions",
    alias: "Get Subscriptions By Destination",
    description: `List subscriptions for a destination. Actions: Destination:GetSubscriptions`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ destination: z.string() })
      },
      {
        name: "destination",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeGetSubscriptionsByDestinationResponse,
  },
  {
    method: "delete",
    path: "/destinations/:destination/subscriptions",
    alias: "Delete Subscription",
    description: `Delete a subscription. Actions: Destination:DeleteSubscription`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeDeleteSubscriptionRequest1
      },
      {
        name: "destination",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "get",
    path: "/destinations/accounts/:account",
    alias: "Get Destinations",
    description: `Get all destinations for an account. Actions: Destination:GetDestinations`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ account: z.string() })
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeGetDestinationsResponse,
  },
  {
    method: "get",
    path: "/destinations/accounts/:account/subscriptions",
    alias: "Get Subscriptions",
    description: `Get all subscriptions for an account. Actions: Destination:GetSubscriptions`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ account: z.string() })
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeGetSubscriptionsResponse,
  },
  {
    method: "post",
    path: "/destinations/subscriptions",
    alias: "Create Subscriptions",
    description: `Create one or more subscriptions. Actions: Destination:CreateSubscription`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeCreateSubscriptionsRequest
      },
    ],
    response: XubeCreateSubscriptionsResponse,
  },
  {
    method: "get",
    path: "/destinations/subscriptions/:subscription",
    alias: "Get Subscription By ID",
    description: `Get a specific subscription by ID. Actions: Destination:GetSubscriptions`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ subscription: z.string() })
      },
      {
        name: "subscription",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeGetSubscriptionByIdResponse,
  },
  {
    method: "delete",
    path: "/destinations/subscriptions/:subscription",
    alias: "Delete Subscription By ID",
    description: `Delete a subscription by ID. Actions: Destination:DeleteSubscriptionById`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ subscription: z.string() })
      },
      {
        name: "subscription",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "get",
    path: "/destinations/subscriptions/targets",
    alias: "Get Subscriptions By Targets",
    description: `Get all subscriptions for selected targets. Actions: Destination:GetSubscriptions`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetSubscriptionsByTargetsRequest
      },
      {
        name: "facetType",
        type: "Query",
        schema: z.string().optional()
      },
      {
        name: "targets",
        type: "Query",
        schema: z.string()
      },
      {
        name: "facetId",
        type: "Query",
        schema: z.string().optional()
      },
    ],
    response: XubeGetSubscriptionsByTargetsResponse,
  },
  {
    method: "get",
    path: "/devices/",
    alias: "Get Devices",
    description: `Subscribe to Devices. Actions: Device:GetDeviceInstance`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetDevicesRequestModelName
      },
    ],
    response: z.array(z.object({ generation: z.string(), componentType: z.literal("DEVICE"), creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }), entityType: z.literal("DEVICE"), certificate: z.object({ certificateArn: z.string() }).partial().optional(), description: z.string().optional(), type: z.literal("DEVICE:COMPONENT"), updater: z.string().optional(), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), thingArn: z.string().optional(), service: z.literal("Device"), name: z.string().optional(), model: z.string(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), make: z.string(), modelOrigin: z.object({ versionId: z.string(), modelId: z.string() }) }).passthrough()),
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
        schema: z.object({ device: z.string() })
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: XubeUpdateDeviceRequest
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: z.object({ device: z.string() })
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: XubeGetDeviceLatestActivationStatusRequest
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: XubeSetDeviceActivationStatusRequest
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: z.object({ device: z.string() })
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: z.object({ device: z.string() })
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: z.object({ device: z.string() })
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: XubeSetDeviceUpdateRequest
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: XubeSetUpdateApprovalRequest
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "post",
    path: "/devices/:device/config/update/cancel",
    alias: "Cancel Device Config Update",
    description: `Cancel Device Config Update. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeCancelDeviceUpdateRequest
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "get",
    path: "/devices/:device/data-destinations",
    alias: "Get Device Data Destination",
    description: `Get the device data destination. Actions: Device:GetDeviceDataDestination`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetDeviceDataDestinationRequest
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeDeviceDataDestination,
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
        schema: z.object({ device: z.string() })
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: z.object({ device: z.string() })
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: z.object({ device: z.string() })
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ job: z.string() }),
  },
  {
    method: "get",
    path: "/devices/:device/events",
    alias: "Get Device Events",
    description: `Get Device Events. Actions: Device:GetDeviceEvents`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetDeviceEventsRequest
      },
      {
        name: "start",
        type: "Query",
        schema: z.string().optional()
      },
      {
        name: "descending",
        type: "Query",
        schema: z.string().optional()
      },
      {
        name: "limit",
        type: "Query",
        schema: z.string().optional()
      },
      {
        name: "nextToken",
        type: "Query",
        schema: z.string().optional()
      },
      {
        name: "end",
        type: "Query",
        schema: z.string().optional()
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeGetDeviceEventsResponse,
  },
  {
    method: "get",
    path: "/devices/:device/facets",
    alias: "Get Device Facets",
    description: `Get device facets. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ device: z.string() })
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeDeviceFacets,
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
        schema: z.object({ device: z.string() })
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: z.object({ device: z.string() })
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: z.object({ device: z.string() })
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: XubeSetFirmwareVersionRequest
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: z.object({ device: z.string() })
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: XubeFirmwareRequest
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: z.object({ device: z.string() })
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: z.object({ device: z.string() })
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeDeviceFirmwareUpdate,
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
        schema: XubeSetDeviceUpdateRequest
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: XubeSetUpdateApprovalRequest
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "post",
    path: "/devices/:device/firmware/update/cancel",
    alias: "Cancel Device Firmware Update",
    description: `Cancel Device Firmware Update. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeCancelDeviceUpdateRequest
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: z.object({ device: z.string() })
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.string(),
  },
  {
    method: "get",
    path: "/devices/:device/heartbeats",
    alias: "Get Device Heartbeats",
    description: `Get Device Heartbeats. Actions: Device:GetDeviceHeartbeats`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetDeviceHeartbeatsRequest
      },
      {
        name: "start",
        type: "Query",
        schema: z.string().optional()
      },
      {
        name: "descending",
        type: "Query",
        schema: z.string().optional()
      },
      {
        name: "limit",
        type: "Query",
        schema: z.string().optional()
      },
      {
        name: "nextToken",
        type: "Query",
        schema: z.string().optional()
      },
      {
        name: "end",
        type: "Query",
        schema: z.string().optional()
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeGetDeviceHeartbeatsResponse,
  },
  {
    method: "get",
    path: "/devices/:device/heartbeats/latest",
    alias: "Get Latest Device Heartbeat",
    description: `Get Latest Device Heartbeat. Actions: Device:GetDeviceHeartbeats`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ device: z.string() })
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeGetLatestDeviceHeartbeatResponse,
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
        schema: z.object({ device: z.string() })
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: XubeSetDeviceLocationRequest
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: z.object({ device: z.string() })
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: XubeGetDevicesRequestModelName
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: z.object({ device: z.string() })
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: XubeResetConnectedDevicesRequest
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: z.object({ device: z.string() })
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: z.object({ device: z.string() })
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ job: z.string() }),
  },
  {
    method: "get",
    path: "/devices/:device/subscriptions",
    alias: "Get Device Subscriptions",
    description: `Get device subscriptions. Actions: Device:GetDeviceSubscription`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ device: z.string() })
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeGetDeviceSubscriptionsResponse,
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
        schema: z.object({ device: z.string() })
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: XubeGetDeviceVersionDownloadUrlRequest
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
      },
      {
        name: "version",
        type: "Path",
        schema: z.string()
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
        schema: z.object({ device: z.string() })
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
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
        schema: XubeAccountDevicesRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeAccountDevices,
  },
  {
    method: "get",
    path: "/devices/accounts/:account/facets",
    alias: "Get Devices Facets By Account",
    description: `Get a device&#x27;s account facets. Actions: Device:GetAccountDeviceFacets`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetAccountFacetsRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeGetAccountFacetsResponse,
  },
  {
    method: "get",
    path: "/devices/accounts/:account/facets/:facet",
    alias: "Get Device Facet By Account",
    description: `Get a device&#x27;s account facet. Actions: Device:GetAccountDeviceFacets`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetAccountFacetRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
      {
        name: "facet",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeGetAccountFacetsResponse,
  },
  {
    method: "get",
    path: "/devices/canonical-events",
    alias: "Get Canonical Device Events",
    description: `List canonical device events. Actions: Device:ManageCanonicalDeviceEvents`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({  }).partial()
      },
    ],
    response: XubeGetCanonicalDeviceEventsResponse,
  },
  {
    method: "post",
    path: "/devices/canonical-events",
    alias: "Create Canonical Device Event",
    description: `Create a canonical device event. Actions: Device:ManageCanonicalDeviceEvents`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeCreateCanonicalDeviceEventRequest
      },
    ],
    response: XubeCanonicalDeviceEventResponse,
  },
  {
    method: "delete",
    path: "/devices/canonical-events/:deviceEventId",
    alias: "Delete Canonical Device Event",
    description: `Delete a canonical device event. Actions: Device:ManageCanonicalDeviceEvents`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ deviceEventId: z.string() })
      },
      {
        name: "deviceEventId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "patch",
    path: "/devices/canonical-events/:deviceEventId",
    alias: "Update Canonical Device Event",
    description: `Update a canonical device event. Actions: Device:ManageCanonicalDeviceEvents`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeUpdateCanonicalDeviceEventRequest
      },
      {
        name: "deviceEventId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeCanonicalDeviceEventResponse,
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
        schema: XubeCopyDeviceConfigRequest
      },
    ],
    response: z.boolean(),
  },
  {
    method: "get",
    path: "/devices/data-destinations",
    alias: "Get Destination Devices",
    description: `Get devices for a specific data destination. Actions: Device:GetDestinationDevices`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetDestinationDevicesRequest
      },
    ],
    response: XubeDestinationDevices,
  },
  {
    method: "get",
    path: "/devices/event-mappings",
    alias: "Get Device Event Mappings",
    description: `List device event mappings for a model version. Actions: Device:ManageDeviceEventMappings`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetDeviceEventMappingsRequest
      },
      {
        name: "deviceModelVersionId",
        type: "Query",
        schema: z.string().optional()
      },
      {
        name: "deviceEventId",
        type: "Query",
        schema: z.string().optional()
      },
      {
        name: "deviceModelId",
        type: "Query",
        schema: z.string().optional()
      },
    ],
    response: XubeGetDeviceEventMappingsResponse,
  },
  {
    method: "post",
    path: "/devices/event-mappings",
    alias: "Attach Device Event Mapping",
    description: `Attach a device event mapping to a model version. Actions: Device:ManageDeviceEventMappings`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeAttachDeviceEventMappingRequest
      },
    ],
    response: XubeDeviceEventMappingResponse,
  },
  {
    method: "delete",
    path: "/devices/event-mappings/:mappingId",
    alias: "Remove Device Event Mapping",
    description: `Remove a device event mapping from a model version. Actions: Device:ManageDeviceEventMappings`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeRemoveDeviceEventMappingRequest
      },
      {
        name: "deviceModelVersionId",
        type: "Query",
        schema: z.string()
      },
      {
        name: "deviceModelId",
        type: "Query",
        schema: z.string()
      },
      {
        name: "mappingId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "get",
    path: "/devices/events",
    alias: "Get Account Device Events",
    description: `Get device events across an account, filtered by minimum level. Actions: Device:GetAccountDeviceEvents`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetAccountDeviceEventsRequest
      },
      {
        name: "descending",
        type: "Query",
        schema: z.string().optional()
      },
      {
        name: "limit",
        type: "Query",
        schema: z.string().optional()
      },
      {
        name: "nextToken",
        type: "Query",
        schema: z.string().optional()
      },
      {
        name: "minLevel",
        type: "Query",
        schema: z.string().optional()
      },
      {
        name: "accountId",
        type: "Query",
        schema: z.string()
      },
    ],
    response: XubeGetAccountDeviceEventsResponse,
  },
  {
    method: "get",
    path: "/devices/facets",
    alias: "Get Devices Facets",
    description: `Get facets for multiple devices. Actions: Device:GetDevicesFacets`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetDevicesFacetsRequest
      },
    ],
    response: XubeGetDevicesFacetsResponse,
  },
  {
    method: "get",
    path: "/devices/facets/categories",
    alias: "Get Device Facet Categories",
    description: `Get categories for specified device facet types. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetDeviceFacetCategoriesRequest
      },
    ],
    response: XubeGetDeviceFacetCategoriesResponse,
  },
  {
    method: "get",
    path: "/devices/facets/types",
    alias: "Get Device Facet Types",
    description: `Get all available device facet types. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({  }).partial()
      },
    ],
    response: XubeGetDeviceFacetTypesResponse,
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
        schema: XubeFirmwareRequest
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
        schema: XubeSetFirmwareVersionsRequest
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
        schema: XubeFirmwareRequest
      },
    ],
    response: z.string(),
  },
  {
    method: "get",
    path: "/devices/heartbeats",
    alias: "Get Devices Heartbeats",
    description: `Get Devices Heartbeats. Actions: Device:GetDeviceHeartbeats`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetDevicesHeartbeatsRequest
      },
    ],
    response: z.array(z.object({ creator: z.string().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityId: z.string(), type: z.literal("DEVICE:COMPONENT:FACET:HEARTBEAT"), deviceId: z.string(), updater: z.string().optional(), accountId: z.string().optional(), facetType: z.literal("HEARTBEAT"), service: z.string(), name: z.string().optional(), isGlobal: z.boolean().optional(), SK: z.string(), id: z.string().min(3), PK: z.string(), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), timestamp: z.string() }).passthrough()),
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
        schema: z.object({  }).partial()
      },
    ],
    response: XubeGetDeviceModelsResponse,
  },
  {
    method: "get",
    path: "/devices/status",
    alias: "Get Devices Status",
    description: `Get Devices Status. Actions: Device:GetDeviceStatus`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetDevicesStatusRequestModelName
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
        schema: z.object({ device: z.string() })
      },
    ],
    response: z.boolean(),
  },
  {
    method: "post",
    path: "/devices/subscriptions",
    alias: "set-devices-subscriptions",
    description: `Set devices subscriptions. Actions: Device:SetDevicesSubscription`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetDevicesSubscriptionsRequest
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "post",
    path: "/devices/sync/push",
    alias: "Push Device Sync",
    description: `Apply a batch of RxDB change rows to device-service-owned records. Each row is routed to the device-core function for its type; unsupported types are rejected.. Actions: Device:PushDeviceSync`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubePushHandlerRequest
      },
    ],
    response: XubePushHandlerResponse,
  },
  {
    method: "get",
    path: "/docs/",
    alias: "Get API Docs",
    description: `Get the API docs.. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({}).partial().passthrough()
      },
    ],
    response: z.string(),
  },
  {
    method: "get",
    path: "/docs/provisioning",
    alias: "Get Provisioning Docs",
    description: `Get the provisioning docs.. Actions: `,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({}).partial().passthrough()
      },
    ],
    response: z.string(),
  },
  {
    method: "get",
    path: "/entity/components",
    alias: "List Components",
    description: `List components scoped to an account or service.. Actions: Entity:ListComponents`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeListComponentsRequest
      },
    ],
    response: XubeComponents,
  },
  {
    method: "post",
    path: "/entity/components",
    alias: "Create Component1",
    description: `Create a new component from an ACTIVE model version. Rejected if the version is DRAFT or INACTIVE.. Actions: Entity:CreateComponent`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeCreateComponentRequest1
      },
    ],
    response: XubeComponent1,
  },
  {
    method: "get",
    path: "/entity/components/:componentId",
    alias: "Get Component1",
    description: `Fetch a single component.. Actions: Entity:GetComponent`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ componentId: z.string() })
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeComponent1,
  },
  {
    method: "patch",
    path: "/entity/components/:componentId",
    alias: "Update Component",
    description: `Update metadata on a component.. Actions: Entity:UpdateComponent`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeUpdateComponentRequest
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeComponent1,
  },
  {
    method: "get",
    path: "/entity/components/:componentId/category",
    alias: "List Component Categories",
    description: `List every category set on a component.. Actions: Entity:ListComponentCategories`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ componentId: z.string() })
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeEntityCategories,
  },
  {
    method: "put",
    path: "/entity/components/:componentId/category/:category",
    alias: "Add Component Category",
    description: `Add a category to a component. Multi-value — re-adding the same category is idempotent.. Actions: Entity:AddComponentCategory`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeAddComponentCategoryRequest
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "category",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeComponentCategoryFacet,
  },
  {
    method: "delete",
    path: "/entity/components/:componentId/category/:category",
    alias: "Remove Component Category",
    description: `Remove a specific category from a component.. Actions: Entity:RemoveComponentCategory`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeRemoveComponentCategoryRequest
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "category",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "get",
    path: "/entity/components/:componentId/children",
    alias: "List Component Children",
    description: `List children attached to a component.. Actions: Entity:ListComponentChildren`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ componentId: z.string() })
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeComponentChildren,
  },
  {
    method: "post",
    path: "/entity/components/:componentId/children",
    alias: "Add Component Child",
    description: `Attach a child component to a parent component.. Actions: Entity:AddComponentChild`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeAddComponentChildRequest
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeComponentChild,
  },
  {
    method: "delete",
    path: "/entity/components/:componentId/children/:childId",
    alias: "Remove Component Child",
    description: `Detach a child component.. Actions: Entity:RemoveComponentChild`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeRemoveComponentChildRequest
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "childId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "get",
    path: "/entity/components/:componentId/configurations",
    alias: "List Component Configurations",
    description: `List every configuration facet on the component.. Actions: Entity:ListComponentConfigurations`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ componentId: z.string() })
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeComponentConfigurations,
  },
  {
    method: "post",
    path: "/entity/components/:componentId/configurations",
    alias: "Create Component Configuration",
    description: `Create a new configuration facet on the component (starts in INCOMPLETE state).. Actions: Entity:CreateComponentConfiguration`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeCreateComponentConfigurationRequest
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeComponentConfiguration,
  },
  {
    method: "get",
    path: "/entity/components/:componentId/configurations/:configuration",
    alias: "Get Component Configuration",
    description: `Fetch a single configuration facet on the component.. Actions: Entity:GetComponentConfiguration`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetComponentConfigurationRequest
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "configuration",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeComponentConfiguration,
  },
  {
    method: "get",
    path: "/entity/components/:componentId/connections",
    alias: "List Component Connections",
    description: `List connections on this component.. Actions: Entity:ListComponentConnections`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ componentId: z.string() })
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeComponentConnections,
  },
  {
    method: "post",
    path: "/entity/components/:componentId/connections",
    alias: "Create Component Connection",
    description: `Create a two-sided connection between two components (starts in INCOMPLETE state).. Actions: Entity:CreateComponentConnection`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeCreateComponentConnectionRequest
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeComponentConnection,
  },
  {
    method: "get",
    path: "/entity/components/:componentId/connections/:connectionId",
    alias: "Get Component Connection",
    description: `Fetch one side of a component connection pair.. Actions: Entity:GetComponentConnection`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetComponentConnectionRequest
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "connectionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeComponentConnection,
  },
  {
    method: "delete",
    path: "/entity/components/:componentId/connections/:connectionId",
    alias: "Delete Component Connection",
    description: `Delete both sides of the component connection pair.. Actions: Entity:DeleteComponentConnection`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeDeleteComponentConnectionRequest
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "connectionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "get",
    path: "/entity/components/:componentId/connections/:connectionId/properties",
    alias: "List Component Connection Properties",
    description: `List every revision of every property on the connection.. Actions: Entity:ListComponentConnectionProperties`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeListComponentConnectionPropertiesRequest
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "connectionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeComponentConnectionProperties,
  },
  {
    method: "post",
    path: "/entity/components/:componentId/connections/:connectionId/properties",
    alias: "Set Component Connection Property",
    description: `Set a property value on a component connection. Each call creates a new revision.. Actions: Entity:SetComponentConnectionProperty`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetComponentConnectionPropertyRequest
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "connectionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeComponentConnectionProperty,
  },
  {
    method: "get",
    path: "/entity/components/:componentId/connections/:connectionId/properties/:propertyId",
    alias: "Get Component Connection Property",
    description: `Fetch the latest-revision value for a property on the connection.. Actions: Entity:GetComponentConnectionProperty`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetComponentConnectionPropertyRequest
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "connectionId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "propertyId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeComponentConnectionProperty,
  },
  {
    method: "delete",
    path: "/entity/components/:componentId/connections/:connectionId/properties/:propertyId",
    alias: "Delete Component Connection Property",
    description: `Remove every revision of the property on the connection.. Actions: Entity:DeleteComponentConnectionProperty`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeDeleteComponentConnectionPropertyRequest
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "connectionId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "propertyId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "post",
    path: "/entity/components/:componentId/deactivate",
    alias: "Deactivate Component",
    description: `Move an ACTIVE component to INACTIVE. Components cannot be deleted; deactivation is the terminal lifecycle transition.. Actions: Entity:DeactivateComponent`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ componentId: z.string() })
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeComponent1,
  },
  {
    method: "post",
    path: "/entity/components/:componentId/extendable-sets/:extendableSetId/grow",
    alias: "Grow Extendable Set",
    description: `Add one copy to an extendable set within its snapshotted bounds — the copy, its child facet, and its wiring in one transaction.. Actions: Entity:GrowExtendableSet`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGrowExtendableSetRequest
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "extendableSetId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeGrowShrinkResponse,
  },
  {
    method: "post",
    path: "/entity/components/:componentId/extendable-sets/:extendableSetId/shrink",
    alias: "Shrink Extendable Set",
    description: `Remove a named copy from an extendable set — the copy&#x27;s rows and its connection duals in one transaction (chained sets shrink from the tail).. Actions: Entity:ShrinkExtendableSet`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeShrinkExtendableSetRequest
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "extendableSetId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeGrowShrinkResponse,
  },
  {
    method: "get",
    path: "/entity/components/:componentId/manifest",
    alias: "Get Component Manifest",
    description: `Fetch a component manifest by state (defaults to EXPECTED; pass ?state&#x3D;CURRENT for the device-reported manifest).. Actions: Entity:GetComponentManifest`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetComponentManifestRequest
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeComponentManifest,
  },
  {
    method: "put",
    path: "/entity/components/:componentId/manifest",
    alias: "Set Component Manifest",
    description: `Replace the component&#x27;s EXPECTED manifest (the living per-component shipping list).. Actions: Entity:SetComponentManifest`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetComponentManifestRequest
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeComponentManifest,
  },
  {
    method: "post",
    path: "/entity/components/:componentId/manifest/entries",
    alias: "Upsert Component Manifest Entries",
    description: `Optimistically merge selected kinds into EXPECTED without overwriting concurrent firmware, config, or future manifest entries.. Actions: Entity:UpsertComponentManifestEntries`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeUpsertComponentManifestEntriesRequest
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeComponentManifest,
  },
  {
    method: "post",
    path: "/entity/components/:componentId/manifest/report",
    alias: "Report Component Manifest",
    description: `Record the CURRENT (device/agent-reported) manifest for a component. Drift &#x3D; EXPECTED vs CURRENT.. Actions: Entity:ReportComponentManifest`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeReportComponentManifestRequest
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeComponentManifest,
  },
  {
    method: "post",
    path: "/entity/components/:componentId/materialise",
    alias: "Materialise Component",
    description: `Build the component&#x27;s starting children and wiring from its pinned design version in one transaction: extendable-set snapshots, per-copy child components, and wired connections per attach rule.. Actions: Entity:MaterialiseComponent`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ componentId: z.string() })
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeMaterialiseComponentResponse,
  },
  {
    method: "get",
    path: "/entity/components/:componentId/properties",
    alias: "List Component Properties",
    description: `List all component-property facets on the component. Returns every revision; callers that need latest-per-instance should group client-side.. Actions: Entity:ListComponentProperties`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ componentId: z.string() })
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeComponentPropertyValues,
  },
  {
    method: "post",
    path: "/entity/components/:componentId/properties",
    alias: "Set Component Property",
    description: `Set a property value on a component. Each call creates a new revision (previous revisions are retained for audit).. Actions: Entity:SetComponentProperty`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetComponentPropertyRequest
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeComponentProperty,
  },
  {
    method: "get",
    path: "/entity/components/:componentId/properties/:propertyId",
    alias: "Get Component Property",
    description: `Fetch the latest-revision value for a property on the component.. Actions: Entity:GetComponentProperty`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetComponentPropertyRequest
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "propertyId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeComponentProperty,
  },
  {
    method: "post",
    path: "/entity/components/:componentId/properties/import",
    alias: "Import Component Properties",
    description: `Atomically validate and import a deterministic batch of component-property revisions.. Actions: Entity:ImportComponentProperties`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeImportComponentPropertiesRequest
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeComponentPropertyValues,
  },
  {
    method: "post",
    path: "/entity/components/:componentId/reactivate",
    alias: "Reactivate Component",
    description: `Restore an INACTIVE component to ACTIVE.. Actions: Entity:ReactivateComponent`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ componentId: z.string() })
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeComponent1,
  },
  {
    method: "put",
    path: "/entity/components/:componentId/slug",
    alias: "Set Component Slug",
    description: `Set the slug for a component, replacing any existing slug.. Actions: Entity:SetComponentSlug`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetComponentSlugRequest
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeComponentSlugFacet,
  },
  {
    method: "delete",
    path: "/entity/components/:componentId/slug",
    alias: "Delete Component Slug",
    description: `Remove the slug from a component.. Actions: Entity:DeleteComponentSlug`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ componentId: z.string() })
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "get",
    path: "/entity/components/:componentId/status",
    alias: "Get Component Status",
    description: `Fetch the rolled-up health status facet (singleton per component).. Actions: Entity:GetComponentStatus`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ componentId: z.string() })
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeComponentStatus,
  },
  {
    method: "put",
    path: "/entity/components/:componentId/status",
    alias: "Set Component Status",
    description: `Replace the singleton status facet on the component with a new health status.. Actions: Entity:SetComponentStatus`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetComponentStatusRequest
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeComponentStatus,
  },
  {
    method: "get",
    path: "/entity/components/category/:category",
    alias: "List Components By Category",
    description: `Return components carrying the given category. Optional &#x60;?componentType&#x3D;&#x60; query narrows to a specific component type. Scope defaults to GLOBAL; pass accountId to scope to one account (membership required).. Actions: Entity:ListComponentsByCategory`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeListComponentsByCategoryRequest
      },
      {
        name: "category",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeComponentsByCategory,
  },
  {
    method: "get",
    path: "/entity/models",
    alias: "List Models",
    description: `List models scoped to an account or service.. Actions: Entity:ListModels`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeListModelsRequest
      },
    ],
    response: XubeModels,
  },
  {
    method: "post",
    path: "/entity/models",
    alias: "Create Model",
    description: `Create a new model.. Actions: Entity:CreateModel`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeCreateModelRequest
      },
    ],
    response: XubeModel,
  },
  {
    method: "get",
    path: "/entity/models/:modelId",
    alias: "Get Model",
    description: `Fetch a single model.. Actions: Entity:GetModel`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ modelId: z.string() })
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModel,
  },
  {
    method: "delete",
    path: "/entity/models/:modelId",
    alias: "Delete Model",
    description: `Delete a model and every item in its partition (versions, facets, children).. Actions: Entity:DeleteModel`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ modelId: z.string() })
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "patch",
    path: "/entity/models/:modelId",
    alias: "Update Model",
    description: `Update metadata on a model.. Actions: Entity:UpdateModel`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeUpdateModelRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModel,
  },
  {
    method: "get",
    path: "/entity/models/:modelId/category",
    alias: "List Model Categories",
    description: `List every category set on a model.. Actions: Entity:ListModelCategories`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ modelId: z.string() })
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeEntityCategories,
  },
  {
    method: "put",
    path: "/entity/models/:modelId/category/:category",
    alias: "Add Model Category",
    description: `Add a category to a model. Multi-value — re-adding the same category is idempotent.. Actions: Entity:AddModelCategory`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeAddModelCategoryRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "category",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelCategoryFacet,
  },
  {
    method: "delete",
    path: "/entity/models/:modelId/category/:category",
    alias: "Remove Model Category",
    description: `Remove a specific category from a model.. Actions: Entity:RemoveModelCategory`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeRemoveModelCategoryRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "category",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "post",
    path: "/entity/models/:modelId/media/upload-url",
    alias: "Get Model Media Upload Url",
    description: `Issue short-lived presigned PUT URLs for a model&#x27;s image and/or thumbnail. The browser uploads the bytes directly to S3, then writes the matching facet rows through sync push.. Actions: Entity:GetModelMediaUploadUrl`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetModelMediaUploadUrlRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelMediaUploadUrl,
  },
  {
    method: "get",
    path: "/entity/models/:modelId/part",
    alias: "Get Model Part",
    description: `Return the part marker for a model, or null when the model is not a part.. Actions: Entity:GetModelPart`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ modelId: z.string() })
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelPartFacet,
  },
  {
    method: "put",
    path: "/entity/models/:modelId/part",
    alias: "Add Model Part",
    description: `Mark a model as a part: a unit that can be composed into assemblies and sold on its own. Presence-only and idempotent — re-marking an existing part is a no-op. Part-ness is independent of the model&#x27;s categories.. Actions: Entity:AddModelPart`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ modelId: z.string() })
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelPartFacet,
  },
  {
    method: "delete",
    path: "/entity/models/:modelId/part",
    alias: "Remove Model Part",
    description: `Unmark a model as a part. Idempotent — removing when the model is not a part succeeds.. Actions: Entity:RemoveModelPart`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ modelId: z.string() })
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "put",
    path: "/entity/models/:modelId/slug",
    alias: "Set Model Slug",
    description: `Set the slug for a model, replacing any existing slug.. Actions: Entity:SetModelSlug`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetModelSlugRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelSlugFacet,
  },
  {
    method: "delete",
    path: "/entity/models/:modelId/slug",
    alias: "Delete Model Slug",
    description: `Remove the slug from a model.. Actions: Entity:DeleteModelSlug`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ modelId: z.string() })
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "get",
    path: "/entity/models/:modelId/versions",
    alias: "List Model Versions",
    description: `List versions of a model.. Actions: Entity:ListVersions`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ modelId: z.string() })
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelVersions,
  },
  {
    method: "post",
    path: "/entity/models/:modelId/versions",
    alias: "Create Model Version",
    description: `Create a new model version (initialised as DRAFT).. Actions: Entity:CreateVersion`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeCreateVersionRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelVersion,
  },
  {
    method: "get",
    path: "/entity/models/:modelId/versions/:versionId",
    alias: "Get Model Version",
    description: `Fetch a single model version.. Actions: Entity:GetVersion`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetVersionRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelVersion,
  },
  {
    method: "delete",
    path: "/entity/models/:modelId/versions/:versionId",
    alias: "Delete Model Version",
    description: `Delete a DRAFT model version.. Actions: Entity:DeleteVersion`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeDeleteVersionRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "patch",
    path: "/entity/models/:modelId/versions/:versionId",
    alias: "Update Model Version",
    description: `Update metadata on a model version.. Actions: Entity:UpdateVersion`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeUpdateVersionRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelVersion,
  },
  {
    method: "get",
    path: "/entity/models/:modelId/versions/:versionId/children",
    alias: "List Model Children",
    description: `List children attached to a model version.. Actions: Entity:ListModelChildren`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeListModelChildrenRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelChildren,
  },
  {
    method: "post",
    path: "/entity/models/:modelId/versions/:versionId/children",
    alias: "Add Model Child",
    description: `Attach a child entity to a DRAFT model version. Rejected if the version is ACTIVE or INACTIVE.. Actions: Entity:AddModelChild`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeAddModelChildRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelChild,
  },
  {
    method: "delete",
    path: "/entity/models/:modelId/versions/:versionId/children/:childId",
    alias: "Remove Model Child",
    description: `Detach a child from a model version. Parent must be DRAFT.. Actions: Entity:RemoveModelChild`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeRemoveModelChildRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "childId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "patch",
    path: "/entity/models/:modelId/versions/:versionId/children/:childId",
    alias: "Update Model Child",
    description: `Update a child entry on a DRAFT model version — exposure (Internal / Boundary / External).. Actions: Entity:UpdateModelChild`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeUpdateModelChildRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "childId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelChild,
  },
  {
    method: "get",
    path: "/entity/models/:modelId/versions/:versionId/compatibility",
    alias: "Get Model Compatibility",
    description: `Resolved mating set for a connector model version: its own forward declarations UNION every declaration pointing at the model (reverse, via GSI6). A mate is compatibleModelId on forward rows and modelId on reverse rows.. Actions: Entity:GetModelCompatibility`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetModelCompatibilityRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeCompatibilityFacets,
  },
  {
    method: "get",
    path: "/entity/models/:modelId/versions/:versionId/config-bindings",
    alias: "List Model Configuration Bindings",
    description: `List and optionally narrow configuration bindings on a model version.. Actions: Entity:ListModelConfigBindings`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeListModelConfigBindingsRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelConfigBindings,
  },
  {
    method: "post",
    path: "/entity/models/:modelId/versions/:versionId/config-bindings",
    alias: "Attach Model Configuration Binding",
    description: `Bind a JSON artefact pointer to a property declaration on a DRAFT model version.. Actions: Entity:AttachModelConfigBinding`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeAttachModelConfigBindingRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelConfigBinding,
  },
  {
    method: "delete",
    path: "/entity/models/:modelId/versions/:versionId/config-bindings/:configBindingId",
    alias: "Remove Model Configuration Binding",
    description: `Remove a configuration binding from a DRAFT model version.. Actions: Entity:RemoveModelConfigBinding`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeRemoveModelConfigBindingRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "configBindingId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "get",
    path: "/entity/models/:modelId/versions/:versionId/connections",
    alias: "List Model Connections",
    description: `List connections belonging to this model version.. Actions: Entity:ListModelConnections`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeListModelConnectionsRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelConnections,
  },
  {
    method: "post",
    path: "/entity/models/:modelId/versions/:versionId/connections",
    alias: "Create Model Connection",
    description: `Create a two-sided connection between two DRAFT model versions. Both sides must be DRAFT.. Actions: Entity:CreateModelConnection`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeCreateModelConnectionRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelConnection,
  },
  {
    method: "get",
    path: "/entity/models/:modelId/versions/:versionId/connections/:connectionId",
    alias: "Get Model Connection",
    description: `Fetch a single side of a connection pair.. Actions: Entity:GetModelConnection`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetModelConnectionRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "connectionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelConnection,
  },
  {
    method: "delete",
    path: "/entity/models/:modelId/versions/:versionId/connections/:connectionId",
    alias: "Delete Model Connection",
    description: `Delete both sides of the connection pair. Parent version must be DRAFT.. Actions: Entity:DeleteModelConnection`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeDeleteModelConnectionRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "connectionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "get",
    path: "/entity/models/:modelId/versions/:versionId/connections/:connectionId/properties",
    alias: "List Model Connection Properties",
    description: `List properties declared on a model connection.. Actions: Entity:ListModelConnectionProperties`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeListModelConnectionPropertiesRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "connectionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelConnectionProperties,
  },
  {
    method: "post",
    path: "/entity/models/:modelId/versions/:versionId/connections/:connectionId/properties",
    alias: "Set Model Connection Property",
    description: `Set a property value on a model connection. Parent version must be DRAFT.. Actions: Entity:SetModelConnectionProperty`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetModelConnectionPropertyRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "connectionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelConnectionProperty,
  },
  {
    method: "get",
    path: "/entity/models/:modelId/versions/:versionId/connections/:connectionId/properties/:propertyId",
    alias: "Get Model Connection Property",
    description: `Fetch one property on a model connection.. Actions: Entity:GetModelConnectionProperty`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetModelConnectionPropertyRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "connectionId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "propertyId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelConnectionProperty,
  },
  {
    method: "delete",
    path: "/entity/models/:modelId/versions/:versionId/connections/:connectionId/properties/:propertyId",
    alias: "Delete Model Connection Property",
    description: `Remove every instance of this property on the connection. Parent version must be DRAFT.. Actions: Entity:DeleteModelConnectionProperty`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeDeleteModelConnectionPropertyRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "connectionId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "propertyId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "post",
    path: "/entity/models/:modelId/versions/:versionId/deprecate",
    alias: "Deprecate Model Version",
    description: `Move an ACTIVE version to INACTIVE.. Actions: Entity:DeprecateVersion`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeDeprecateVersionRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelVersion,
  },
  {
    method: "get",
    path: "/entity/models/:modelId/versions/:versionId/extendable-sets",
    alias: "List Model Extendable Sets",
    description: `List the extendable sets declared on a model version.. Actions: Entity:ListModelExtendableSets`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeListModelExtendableSetsRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelExtendableSets,
  },
  {
    method: "post",
    path: "/entity/models/:modelId/versions/:versionId/extendable-sets",
    alias: "Attach Model Extendable Set",
    description: `Declare an extendable set (min/max/default instance counts) on a DRAFT model version.. Actions: Entity:AttachModelExtendableSet`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeAttachModelExtendableSetRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelExtendableSet,
  },
  {
    method: "delete",
    path: "/entity/models/:modelId/versions/:versionId/extendable-sets/:extendableSetId",
    alias: "Remove Model Extendable Set",
    description: `Remove an extendable set from a DRAFT model version.. Actions: Entity:RemoveModelExtendableSet`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeRemoveModelExtendableSetRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "extendableSetId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "get",
    path: "/entity/models/:modelId/versions/:versionId/facets/compatibility",
    alias: "List Compatibility Facets",
    description: `List the compatibility declarations owned by this connector model version (forward direction only).. Actions: Entity:ListCompatibilityFacets`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeListCompatibilityFacetsRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeCompatibilityFacets,
  },
  {
    method: "post",
    path: "/entity/models/:modelId/versions/:versionId/facets/compatibility",
    alias: "Create Compatibility Facet",
    description: `Declare that a connector model version mates with a peer connector model. Declaring version must be DRAFT; both models must be CONNECTOR-typed. Declarations are one-way — the full mating set is resolved via Get Model Compatibility.. Actions: Entity:CreateCompatibilityFacet`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeCreateCompatibilityFacetRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeCompatibilityFacet,
  },
  {
    method: "delete",
    path: "/entity/models/:modelId/versions/:versionId/facets/compatibility/:compatibleModelId",
    alias: "Delete Compatibility Facet",
    description: `Remove a compatibility declaration from a connector model version. Declaring version must be DRAFT.. Actions: Entity:DeleteCompatibilityFacet`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeDeleteCompatibilityFacetRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "compatibleModelId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "get",
    path: "/entity/models/:modelId/versions/:versionId/facets/direction",
    alias: "Get Direction Facet",
    description: `Fetch the direction facet on a model version.. Actions: Entity:GetDirectionFacet`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetDirectionFacetRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeDirectionFacet,
  },
  {
    method: "put",
    path: "/entity/models/:modelId/versions/:versionId/facets/direction",
    alias: "Set Direction Facet",
    description: `Set the direction of an interface model version. Parent version must be DRAFT and the model&#x27;s entityType must be INTERFACE.. Actions: Entity:SetDirectionFacet`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetDirectionFacetRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeDirectionFacet,
  },
  {
    method: "delete",
    path: "/entity/models/:modelId/versions/:versionId/facets/direction",
    alias: "Delete Direction Facet",
    description: `Remove the direction facet from a model version. Parent version must be DRAFT.. Actions: Entity:DeleteDirectionFacet`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeDeleteDirectionFacetRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "get",
    path: "/entity/models/:modelId/versions/:versionId/facets/layout",
    alias: "Get Layout Facet",
    description: `Fetch the canvas layout on a model version.. Actions: Entity:GetLayoutFacet`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetLayoutFacetRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeLayoutFacet,
  },
  {
    method: "put",
    path: "/entity/models/:modelId/versions/:versionId/facets/layout",
    alias: "Set Layout Facet",
    description: `Replace the canvas layout (node positions) on a model version. Singleton per version; CONFIGURABLE, writable at any lifecycle (presentation only).. Actions: Entity:SetLayoutFacet`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetLayoutFacetRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeLayoutFacet,
  },
  {
    method: "get",
    path: "/entity/models/:modelId/versions/:versionId/facets/mounting",
    alias: "List Mounting Facets",
    description: `List the mounting options declared on a model version, each with its own instructions. An empty list means the version is unconstrained.. Actions: Entity:ListMountingFacets`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeListMountingFacetsRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeMountingFacets,
  },
  {
    method: "post",
    path: "/entity/models/:modelId/versions/:versionId/facets/mounting",
    alias: "Create Mounting Facet",
    description: `Declare an exposure this model version may be mounted at, with optional mounting instructions. Version must be DRAFT; declaring the same exposure twice is a conflict. A version that declares no mounting options is unconstrained.. Actions: Entity:CreateMountingFacet`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeCreateMountingFacetRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeMountingFacet,
  },
  {
    method: "delete",
    path: "/entity/models/:modelId/versions/:versionId/facets/mounting/:exposure",
    alias: "Delete Mounting Facet",
    description: `Remove a declared mounting option from a model version. Version must be DRAFT.. Actions: Entity:DeleteMountingFacet`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeDeleteMountingFacetRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "exposure",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "patch",
    path: "/entity/models/:modelId/versions/:versionId/facets/mounting/:exposure",
    alias: "Update Mounting Facet",
    description: `Replace the mounting instructions on a declared option. Version must be DRAFT.. Actions: Entity:UpdateMountingFacet`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeUpdateMountingFacetRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "exposure",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeMountingFacet,
  },
  {
    method: "get",
    path: "/entity/models/:modelId/versions/:versionId/manifest",
    alias: "Get Model Version Manifest",
    description: `Fetch the model version&#x27;s own manifest template, or a per-child override via ?childEntryId&#x3D;&amp;childModelId&#x3D;&amp;childVersionId&#x3D;.. Actions: Entity:GetModelManifest`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetModelManifestRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelManifest,
  },
  {
    method: "put",
    path: "/entity/models/:modelId/versions/:versionId/manifest",
    alias: "Set Model Version Manifest",
    description: `Set the model version&#x27;s manifest template (the shipping list copied to components at creation). Pass childEntryId + childModelId + childVersionId to set the per-child override adjacent to a child entry instead of the own template. IMMUTABLE — DRAFT versions only.. Actions: Entity:SetModelManifest`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetModelManifestRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelManifest,
  },
  {
    method: "delete",
    path: "/entity/models/:modelId/versions/:versionId/manifest",
    alias: "Delete Model Version Manifest",
    description: `Delete the model version&#x27;s own manifest template, or a per-child override via ?childEntryId&#x3D;&amp;childModelId&#x3D;&amp;childVersionId&#x3D;.. Actions: Entity:DeleteModelManifest`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeDeleteModelManifestRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "get",
    path: "/entity/models/:modelId/versions/:versionId/price",
    alias: "Get Model Version Price",
    description: `Fetch the price facet on a specific model version (singleton per version).. Actions: Entity:GetModelPrice`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetModelPriceRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelPrice,
  },
  {
    method: "put",
    path: "/entity/models/:modelId/versions/:versionId/price",
    alias: "Set Model Version Price",
    description: `Replace the singleton price facet on a model version with a new US-dollar amount.. Actions: Entity:SetModelPrice`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetModelPriceRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelPrice,
  },
  {
    method: "delete",
    path: "/entity/models/:modelId/versions/:versionId/price",
    alias: "Delete Model Version Price",
    description: `Delete the price facet from a model version (makes the version unpurchasable).. Actions: Entity:DeleteModelPrice`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeDeleteModelPriceRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "get",
    path: "/entity/models/:modelId/versions/:versionId/properties",
    alias: "List Model Properties",
    description: `List property declarations on a model version.. Actions: Entity:ListModelProperties`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeListModelPropertiesRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelProperties,
  },
  {
    method: "post",
    path: "/entity/models/:modelId/versions/:versionId/properties",
    alias: "Attach Model Property",
    description: `Attach a property declaration to a DRAFT model version. Rejected if the version is ACTIVE or INACTIVE.. Actions: Entity:AttachModelProperty`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeAttachModelPropertyRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelProperty,
  },
  {
    method: "get",
    path: "/entity/models/:modelId/versions/:versionId/properties/:declarationId",
    alias: "Get Model Property",
    description: `Fetch a single property declaration.. Actions: Entity:GetModelProperty`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetModelPropertyRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "declarationId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelProperty,
  },
  {
    method: "delete",
    path: "/entity/models/:modelId/versions/:versionId/properties/:declarationId",
    alias: "Remove Model Property",
    description: `Remove a property declaration. The parent version must be DRAFT.. Actions: Entity:RemoveModelProperty`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeRemoveModelPropertyRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "declarationId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "patch",
    path: "/entity/models/:modelId/versions/:versionId/properties/:declarationId",
    alias: "Update Model Property",
    description: `Update a property declaration. The parent version must be DRAFT.. Actions: Entity:UpdateModelProperty`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeUpdateModelPropertyRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "declarationId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelProperty,
  },
  {
    method: "post",
    path: "/entity/models/:modelId/versions/:versionId/publish",
    alias: "Publish Model Version",
    description: `Promote a DRAFT version to ACTIVE.. Actions: Entity:PublishVersion`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubePublishVersionRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelVersion,
  },
  {
    method: "post",
    path: "/entity/models/:modelId/versions/:versionId/reactivate",
    alias: "Reactivate Model Version",
    description: `Restore an INACTIVE version to ACTIVE.. Actions: Entity:ReactivateVersion`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeReactivateVersionRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelVersion,
  },
  {
    method: "get",
    path: "/entity/models/category/:category",
    alias: "List Models By Category",
    description: `Return models carrying the given category. Optional &#x60;?modelType&#x3D;&#x60; query narrows to a specific model type. Scope defaults to GLOBAL; pass accountId to scope to one account (membership required).. Actions: Entity:ListModelsByCategory`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeListModelsByCategoryRequest
      },
      {
        name: "category",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeModelsByCategory,
  },
  {
    method: "get",
    path: "/entity/models/parts",
    alias: "List Model Parts",
    description: `Return every model marked as a part. Optional &#x60;?modelType&#x3D;&#x60; query narrows to a specific model type. Scope defaults to GLOBAL; pass accountId to scope to one account (membership required).. Actions: Entity:ListModelParts`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeListModelPartsRequest
      },
    ],
    response: XubeModelParts,
  },
  {
    method: "get",
    path: "/entity/properties",
    alias: "List Properties",
    description: `List property entities scoped to an account or service.. Actions: Entity:ListProperties`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeListPropertiesRequest
      },
    ],
    response: XubeProperties,
  },
  {
    method: "post",
    path: "/entity/properties",
    alias: "Create Property",
    description: `Create a new property entity with an optional initial version.. Actions: Entity:CreateProperty`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeCreatePropertyRequest
      },
    ],
    response: XubeProperty,
  },
  {
    method: "get",
    path: "/entity/properties/:propertyId",
    alias: "Get Property",
    description: `Fetch a single property entity.. Actions: Entity:GetProperty`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ propertyId: z.string() })
      },
      {
        name: "propertyId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeProperty,
  },
  {
    method: "delete",
    path: "/entity/properties/:propertyId",
    alias: "Delete Property",
    description: `Delete a property entity and every item in its partition (versions, slug, account facet).. Actions: Entity:DeleteProperty`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ propertyId: z.string() })
      },
      {
        name: "propertyId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "patch",
    path: "/entity/properties/:propertyId",
    alias: "Update Property",
    description: `Update metadata on a property entity.. Actions: Entity:UpdateProperty`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeUpdatePropertyRequest
      },
      {
        name: "propertyId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeProperty,
  },
  {
    method: "get",
    path: "/entity/properties/:propertyId/category",
    alias: "List Property Categories",
    description: `List every category set on a property.. Actions: Entity:ListPropertyCategories`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ propertyId: z.string() })
      },
      {
        name: "propertyId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeEntityCategories,
  },
  {
    method: "put",
    path: "/entity/properties/:propertyId/category/:category",
    alias: "Add Property Category",
    description: `Add a category to a property. Multi-value — re-adding the same category is idempotent.. Actions: Entity:AddPropertyCategory`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeAddPropertyCategoryRequest
      },
      {
        name: "propertyId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "category",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubePropertyCategoryFacet,
  },
  {
    method: "delete",
    path: "/entity/properties/:propertyId/category/:category",
    alias: "Remove Property Category",
    description: `Remove a specific category from a property.. Actions: Entity:RemovePropertyCategory`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeRemovePropertyCategoryRequest
      },
      {
        name: "propertyId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "category",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "put",
    path: "/entity/properties/:propertyId/slug",
    alias: "Set Property Slug",
    description: `Set the slug for a property, replacing any existing slug.. Actions: Entity:SetPropertySlug`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetPropertySlugRequest
      },
      {
        name: "propertyId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubePropertySlugFacet,
  },
  {
    method: "delete",
    path: "/entity/properties/:propertyId/slug",
    alias: "Delete Property Slug",
    description: `Remove the slug from a property.. Actions: Entity:DeletePropertySlug`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ propertyId: z.string() })
      },
      {
        name: "propertyId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "get",
    path: "/entity/properties/:propertyId/versions",
    alias: "List Property Versions",
    description: `List versions of a property.. Actions: Entity:ListPropertyVersions`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ propertyId: z.string() })
      },
      {
        name: "propertyId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubePropertyVersions,
  },
  {
    method: "post",
    path: "/entity/properties/:propertyId/versions",
    alias: "Create Property Version",
    description: `Create a new version of a property.. Actions: Entity:CreatePropertyVersion`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeCreatePropertyVersionRequest
      },
      {
        name: "propertyId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubePropertyVersion,
  },
  {
    method: "get",
    path: "/entity/properties/:propertyId/versions/:versionId",
    alias: "Get Property Version",
    description: `Fetch a single property version.. Actions: Entity:GetPropertyVersion`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetPropertyVersionRequest
      },
      {
        name: "propertyId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubePropertyVersion,
  },
  {
    method: "delete",
    path: "/entity/properties/:propertyId/versions/:versionId",
    alias: "Delete Property Version",
    description: `Delete a single property version.. Actions: Entity:DeletePropertyVersion`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeDeletePropertyVersionRequest
      },
      {
        name: "propertyId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.boolean(),
  },
  {
    method: "patch",
    path: "/entity/properties/:propertyId/versions/:versionId",
    alias: "Update Property Version",
    description: `Update metadata on a property version.. Actions: Entity:UpdatePropertyVersion`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeUpdatePropertyVersionRequest
      },
      {
        name: "propertyId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubePropertyVersion,
  },
  {
    method: "get",
    path: "/entity/properties/category/:category",
    alias: "List Properties By Category",
    description: `Return properties carrying the given category. Scope defaults to GLOBAL; pass accountId to scope to one account (membership required).. Actions: Entity:ListPropertiesByCategory`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeListPropertiesByCategoryRequest
      },
      {
        name: "category",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubePropertiesByCategory,
  },
  {
    method: "post",
    path: "/entity/sync/push",
    alias: "Push Entity Sync",
    description: `Apply a batch of RxDB change rows to entity-service-owned records. Each row is routed to the entity-core function for its type; unsupported types are rejected.. Actions: Entity:PushEntitySync`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubePushHandlerRequest
      },
    ],
    response: XubePushHandlerResponse,
  },
  {
    method: "get",
    path: "/geometry/components/:componentId/colors",
    alias: "Get Component Colors",
    description: `Read the customer-variant colour override for this component.. Actions: Geometry:GetComponentColors`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ componentId: z.string() })
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeGetComponentColorsResponse,
  },
  {
    method: "put",
    path: "/geometry/components/:componentId/colors",
    alias: "Set Component Colors",
    description: `Replace the component-scoped colour override. Rejected if the pinned model version&#x27;s primary CAD is IMMUTABLE / INHERENT / DERIVED.. Actions: Geometry:SetComponentColors`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetComponentColorsRequest
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeSetComponentColorsResponse,
  },
  {
    method: "delete",
    path: "/geometry/components/:componentId/colors",
    alias: "Delete Component Colors",
    description: `Remove the component-scoped colour override; component reverts to the model-version palette.. Actions: Geometry:DeleteComponentColors`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ componentId: z.string() })
      },
      {
        name: "componentId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ deleted: z.boolean() }),
  },
  {
    method: "get",
    path: "/geometry/models/:modelId/versions/:versionId/cads",
    alias: "List CADs",
    description: `List every CAD facet on this model version paired with signed download URLs.. Actions: Geometry:ListCads`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeListCadsRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeListCadsResponse,
  },
  {
    method: "post",
    path: "/geometry/models/:modelId/versions/:versionId/cads",
    alias: "Add CAD",
    description: `Mint a new CAD slot on this version: generates a cadId, writes an uncommitted row, returns signed upload URLs. Caller PUTs source/bundle/map/meta then calls commit.. Actions: Geometry:AddCad`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeAddCadRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeAddCadResponse,
  },
  {
    method: "delete",
    path: "/geometry/models/:modelId/versions/:versionId/cads/:cadId",
    alias: "Delete CAD",
    description: `Drop a CAD and its S3 bytes. Refuses if it would leave the version with zero CADs. Promotes a new primary if needed.. Actions: Geometry:DeleteCad`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeDeleteCadRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "cadId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeDeleteCadResponse,
  },
  {
    method: "post",
    path: "/geometry/models/:modelId/versions/:versionId/cads/:cadId/commit",
    alias: "Commit CAD",
    description: `Finalise a CAD by recording its content hash. Idempotent — re-commit with the same hash is a no-op-equivalent overwrite.. Actions: Geometry:CommitCad`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeCommitCadRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "cadId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeCommitCadResponse,
  },
  {
    method: "put",
    path: "/geometry/models/:modelId/versions/:versionId/cads/:cadId/primary",
    alias: "Set Primary CAD",
    description: `Flip the primary flag to this CAD; clears it off whichever CAD held it before.. Actions: Geometry:SetPrimaryCad`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetPrimaryCadRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "cadId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeSetPrimaryCadResponse,
  },
  {
    method: "get",
    path: "/geometry/models/:modelId/versions/:versionId/colors",
    alias: "Get Model Colors",
    description: `Read the colours facet for this model version.. Actions: Geometry:GetModelColors`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetModelColorsRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeGetModelColorsResponse,
  },
  {
    method: "put",
    path: "/geometry/models/:modelId/versions/:versionId/colors",
    alias: "Set Model Colors",
    description: `Replace the model-version colours facet. Rejected if the primary CAD&#x27;s colorConfigurability is IMMUTABLE or DERIVED.. Actions: Geometry:SetModelColors`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetModelColorsRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeSetModelColorsResponse,
  },
  {
    method: "delete",
    path: "/geometry/models/:modelId/versions/:versionId/colors",
    alias: "Delete Model Colors",
    description: `Remove the model-version colours facet.. Actions: Geometry:DeleteModelColors`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeDeleteModelColorsRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ deleted: z.boolean() }),
  },
  {
    method: "get",
    path: "/geometry/models/:modelId/versions/:versionId/dimensions",
    alias: "Get Dimensions",
    description: `Read the dimensions facet (length, width, and height) for this model version.. Actions: Geometry:GetDimensions`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetDimensionsRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeGetDimensionsResponse,
  },
  {
    method: "put",
    path: "/geometry/models/:modelId/versions/:versionId/dimensions",
    alias: "Set Dimensions",
    description: `Replace the dimensions facet on this model version with new length, width, and height values.. Actions: Geometry:SetDimensions`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetDimensionsRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeSetDimensionsResponse,
  },
  {
    method: "delete",
    path: "/geometry/models/:modelId/versions/:versionId/dimensions",
    alias: "Delete Dimensions",
    description: `Remove the dimensions facet from this model version.. Actions: Geometry:DeleteDimensions`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeDeleteDimensionsRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ deleted: z.boolean() }),
  },
  {
    method: "get",
    path: "/geometry/models/:modelId/versions/:versionId/weight",
    alias: "Get Weight",
    description: `Read the weight facet for this model version.. Actions: Geometry:GetWeight`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetWeightRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeGetWeightResponse,
  },
  {
    method: "put",
    path: "/geometry/models/:modelId/versions/:versionId/weight",
    alias: "Set Weight",
    description: `Replace the weight facet on this model version with a new weight + unit.. Actions: Geometry:SetWeight`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetWeightRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeSetWeightResponse,
  },
  {
    method: "delete",
    path: "/geometry/models/:modelId/versions/:versionId/weight",
    alias: "Delete Weight",
    description: `Remove the weight facet from this model version.. Actions: Geometry:DeleteWeight`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeDeleteWeightRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ deleted: z.boolean() }),
  },
  {
    method: "post",
    path: "/geometry/sync/push",
    alias: "Push Geometry Sync",
    description: `Accept a sync-push batch for geometry-owned facet types. Dispatched via the shared @xubeltd/sync-protocol wire contract.. Actions: Geometry:PushGeometrySync`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({  }).partial().passthrough()
      },
    ],
    response: z.object({  }).partial().passthrough(),
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
        schema: XubeCreateGroupRequest
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
        schema: z.object({ group: z.string() })
      },
      {
        name: "group",
        type: "Path",
        schema: z.string()
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
        schema: XubeUpdateGroupRequest
      },
      {
        name: "group",
        type: "Path",
        schema: z.string()
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
        schema: XubeGetGroupChildrenRequest
      },
      {
        name: "group",
        type: "Path",
        schema: z.string()
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
        schema: XubeAddChildrenToGroupRequest
      },
      {
        name: "group",
        type: "Path",
        schema: z.string()
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
        schema: XubeRemoveChildrenFromGroupRequest
      },
      {
        name: "group",
        type: "Path",
        schema: z.string()
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
        schema: XubeGetAccountGroupsRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeGetAccountGroupsResponse,
  },
  {
    method: "get",
    path: "/products/:productId",
    alias: "Get Product",
    description: `Get a single Product by id. Actions: Product:GetProduct`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ productId: z.string() })
      },
      {
        name: "productId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeProduct,
  },
  {
    method: "patch",
    path: "/products/:productId",
    alias: "Update Product",
    description: `Update a Product&#x27;s name, description, serial number, or lifecycle. Actions: Product:UpdateProduct`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeUpdateProductRequest
      },
      {
        name: "productId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeProduct,
  },
  {
    method: "post",
    path: "/products/:productId/account",
    alias: "Assign Product To Account",
    description: `Assign a Product and its allocated part tree to an account (child-first, idempotent). Actions: Product:AssignProduct`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeAssignProductToAccountRequest
      },
      {
        name: "productId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "post",
    path: "/products/:productId/allocations",
    alias: "Allocate Product Part",
    description: `Allocate an unassigned part to a Product — assigns the part to the Product&#x27;s account and writes the child edge. Actions: Product:AllocateProductPart`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeAllocateProductPartRequest
      },
      {
        name: "productId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "delete",
    path: "/products/:productId/allocations/:childComponentId",
    alias: "Deallocate Product Part",
    description: `Deallocate a part from a Product — removes the child edge and unassigns the part back to inventory. Actions: Product:DeallocateProductPart`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeDeallocateProductPartRequest
      },
      {
        name: "productId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "childComponentId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "post",
    path: "/products/:productId/plan",
    alias: "Set Product Plan",
    description: `Write the Product&#x27;s plan facet and return a presigned upload URL for the plan image. Actions: Product:SetProductPlan`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetProductPlanRequest
      },
      {
        name: "productId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ presignedUploadUrl: z.string().url() }),
  },
  {
    method: "delete",
    path: "/products/:productId/plan",
    alias: "Clear Product Plan",
    description: `Clear the Product&#x27;s plan (deletes the image and the facet; idempotent). Actions: Product:ClearProductPlan`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ productId: z.string() })
      },
      {
        name: "productId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "get",
    path: "/products/:productId/plan/url",
    alias: "Get Product Plan Url",
    description: `Get a presigned download URL for the Product&#x27;s stored plan image. Actions: Product:GetProductPlanUrl`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ productId: z.string() })
      },
      {
        name: "productId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ planUrl: z.string().url() }),
  },
  {
    method: "get",
    path: "/products/:productId/readiness",
    alias: "Get Product Readiness",
    description: `Compute the Product&#x27;s build readiness — model-version tree match, missing/unexpected parts, allocation progress. Actions: Product:GetProductReadiness`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ productId: z.string() })
      },
      {
        name: "productId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeProductReadiness,
  },
  {
    method: "get",
    path: "/products/:productId/status",
    alias: "Get Product Status",
    description: `Get the Product&#x27;s build status. Actions: Product:GetProductStatus`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ productId: z.string() })
      },
      {
        name: "productId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeProductStatus,
  },
  {
    method: "post",
    path: "/products/:productId/status",
    alias: "Set Product Status",
    description: `Set the Product&#x27;s build status — ASSEMBLED is gated on full allocation, arrival, and a model-version tree match; SHIPPED requires ASSEMBLED. Actions: Product:SetProductStatus`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetProductStatusRequest
      },
      {
        name: "productId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeProductStatus,
  },
  {
    method: "get",
    path: "/products/accounts/:accountId",
    alias: "Get Products",
    description: `List an account&#x27;s Products. Actions: Product:ListProducts`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeListProductsRequest
      },
      {
        name: "accountId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeProducts,
  },
  {
    method: "post",
    path: "/products/atomic",
    alias: "Create Product Atomic",
    description: `Create a Product via the client-supplied bundle (base + model-origin + status facets) in one atomic write. Actions: Product:CreateProduct`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ componentType: z.literal("PRODUCT"), creator: z.string().optional(), serialNumber: z.string().optional(), allowsCyclicalChildConnections: z.boolean().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityType: z.literal("PRODUCT"), description: z.string().optional(), type: z.literal("PRODUCT:COMPONENT"), updater: z.string().optional(), facets: z.array(
                z.discriminatedUnion("facetType", [XubeCreateProductAtomicAccountEntityEntityFacetAccountRequest, XubeCreateProductAtomicModelEntityComponentFacetModelRequest, XubeCreateProductAtomicStatusProductComponentFacetStatusRequest])
            ), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), service: z.literal("Product"), name: z.string().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), modelOrigin: z.object({ versionId: z.string(), modelId: z.string() }), slug: z.string().optional() }).passthrough()
      },
    ],
    response: z.object({ id: z.string().min(3) }),
  },
  {
    method: "get",
    path: "/products/models",
    alias: "Get Product Models",
    description: `List the global product model catalogue (isGlobal&#x3D;true). Actions: Product:ListProductModels`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeListProductModelsRequest
      },
    ],
    response: XubeProductModels,
  },
  {
    method: "post",
    path: "/products/models",
    alias: "Create Product Model",
    description: `Create a product model (account-owned by default; global with isGlobal&#x3D;true). Actions: Product:CreateProductModel`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeCreateProductModelRequest
      },
    ],
    response: XubeCreateProductModelResponse,
  },
  {
    method: "get",
    path: "/products/models/:modelId",
    alias: "Get Product Model",
    description: `Get a single product model by id. Actions: Product:GetProductModel`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ modelId: z.string() })
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeProductModel,
  },
  {
    method: "patch",
    path: "/products/models/:modelId",
    alias: "Update Product Model",
    description: `Update a product model&#x27;s name, description, or lifecycle. Actions: Product:UpdateProductModel`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeUpdateProductModelRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeProductModel,
  },
  {
    method: "get",
    path: "/products/models/:modelId/versions",
    alias: "Get Product Model Versions",
    description: `List the versions of a product model. Actions: Product:GetProductModelVersion`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ modelId: z.string() })
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeProductModelVersions,
  },
  {
    method: "post",
    path: "/products/models/:modelId/versions",
    alias: "Create Product Model Version",
    description: `Create a DRAFT product model version — empty, or deep-cloned from an existing version via cloneFrom. Actions: Product:CreateProductModelVersion`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeCreateProductModelVersionRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeCreateProductModelVersionResponse,
  },
  {
    method: "get",
    path: "/products/models/:modelId/versions/:versionId",
    alias: "Get Product Model Version",
    description: `Get a single product model version. Actions: Product:GetProductModelVersion`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetProductModelVersionRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeProductModelVersion,
  },
  {
    method: "post",
    path: "/products/models/:modelId/versions/:versionId/deprecate",
    alias: "Deprecate Product Model Version",
    description: `Deprecate an ACTIVE product model version (ACTIVE → INACTIVE). Actions: Product:DeprecateProductModelVersion`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeDeprecateProductModelVersionRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeProductModelVersion,
  },
  {
    method: "post",
    path: "/products/models/:modelId/versions/:versionId/publish",
    alias: "Publish Product Model Version",
    description: `Publish a DRAFT product model version (DRAFT → ACTIVE; structure freezes). Actions: Product:PublishProductModelVersion`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubePublishProductModelVersionRequest
      },
      {
        name: "modelId",
        type: "Path",
        schema: z.string()
      },
      {
        name: "versionId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeProductModelVersion,
  },
  {
    method: "get",
    path: "/products/models/accounts/:accountId",
    alias: "Get Account Product Models",
    description: `List an account&#x27;s product model catalogue. Actions: Product:ListProductModels`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeListProductModelsRequest
      },
      {
        name: "accountId",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeProductModels,
  },
  {
    method: "post",
    path: "/products/sync/push",
    alias: "Push Product Sync",
    description: `Apply a batch of client change rows to product-service-owned records. Each row is routed to the product-core function for its type; unsupported types are rejected.. Actions: Product:PushProductSync`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubePushHandlerRequest
      },
    ],
    response: XubePushHandlerResponse,
  },
  {
    method: "get",
    path: "/sites/",
    alias: "Get Sites",
    description: `List sites (account-scoped, optional rootOnly). Actions: Site:ListSitesInstance`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetSitesRequest
      },
      {
        name: "rootOnly",
        type: "Query",
        schema: z.string().optional()
      },
      {
        name: "account",
        type: "Query",
        schema: z.string()
      },
    ],
    response: XubeSites,
  },
  {
    method: "post",
    path: "/sites/",
    alias: "Create Site",
    description: `Create a new site (atomic component + facet write). Actions: Site:CreateSiteInstance`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeCreateSiteRequest
      },
    ],
    response: z.object({ id: z.string().min(3) }),
  },
  {
    method: "get",
    path: "/sites/:site",
    alias: "Get Site",
    description: `Get a single site by id. Actions: Site:GetSiteInstance`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ site: z.string() })
      },
      {
        name: "site",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeSite,
  },
  {
    method: "delete",
    path: "/sites/:site",
    alias: "Delete Site",
    description: `Delete a site (cascades over children). Actions: Site:DeleteSiteInstance`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ site: z.string() })
      },
      {
        name: "site",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "patch",
    path: "/sites/:site",
    alias: "Update Site",
    description: `Update a site. Actions: Site:UpdateSiteInstance`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeUpdateSiteRequest
      },
      {
        name: "site",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeSite,
  },
  {
    method: "get",
    path: "/sites/:site/account",
    alias: "Get Site Account",
    description: `Get the account currently linked to this site. Actions: Site:GetSiteAccount`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ site: z.string() })
      },
      {
        name: "site",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeSiteAccount,
  },
  {
    method: "post",
    path: "/sites/:site/layout/:canvas",
    alias: "Set Site Layout",
    description: `Set the positions map for a (site, canvas). Replaces the entire positions map — partial updates not supported.. Actions: Site:SetSiteLayout`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetSiteLayoutRequest
      },
      {
        name: "site",
        type: "Path",
        schema: z.string()
      },
      {
        name: "canvas",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "get",
    path: "/sites/:site/location",
    alias: "Get Site Location",
    description: `Get the site location. Actions: Site:GetSiteLocation`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ site: z.string() })
      },
      {
        name: "site",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeSiteLocation,
  },
  {
    method: "post",
    path: "/sites/:site/location",
    alias: "Set Site Location",
    description: `Set the site location. Actions: Site:SetSiteLocation`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetSiteLocationRequest
      },
      {
        name: "site",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "delete",
    path: "/sites/:site/location",
    alias: "Clear Site Location",
    description: `Clear the site location. Actions: Site:ClearSiteLocation`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ site: z.string() })
      },
      {
        name: "site",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "post",
    path: "/sites/:site/move",
    alias: "Move Site",
    description: `Re-parent a site (swap CHILD facet between partitions). Actions: Site:UpdateSiteInstance`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeMoveSiteRequest
      },
      {
        name: "site",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "get",
    path: "/sites/:site/parent",
    alias: "Get Site Parent",
    description: `Get the parent site (404 if this is a root site). Actions: Site:GetSiteInstance`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ site: z.string() })
      },
      {
        name: "site",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeSite,
  },
  {
    method: "post",
    path: "/sites/:site/placement",
    alias: "Set Site Placement",
    description: `Set the site&#x27;s plan-relative placement (x/y/z as percentages of its parent&#x27;s plan canvas). Singleton per site.. Actions: Site:SetSitePlacement`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetSitePlacementRequest
      },
      {
        name: "site",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "get",
    path: "/sites/:site/plan",
    alias: "Get Site Plan",
    description: `Get the site plan metadata + URL. Actions: Site:GetSitePlan`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ site: z.string() })
      },
      {
        name: "site",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeSitePlan,
  },
  {
    method: "post",
    path: "/sites/:site/plan",
    alias: "Set Site Plan",
    description: `Get presigned upload URL for site plan image. Actions: Site:SetSitePlan`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetSitePlanRequest
      },
      {
        name: "site",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeSetSitePlanResponse,
  },
  {
    method: "delete",
    path: "/sites/:site/plan",
    alias: "Clear Site Plan",
    description: `Clear the site plan (deletes image + facet). Actions: Site:ClearSitePlan`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ site: z.string() })
      },
      {
        name: "site",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "get",
    path: "/sites/:site/subsites",
    alias: "Get Subsites",
    description: `List subsites of this site (CHILD facets in partition). Actions: Site:ListSitesInstance`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetSubsitesRequest
      },
      {
        name: "site",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeSites,
  },
  {
    method: "get",
    path: "/sites/accounts/:account",
    alias: "List Account Sites",
    description: `List all sites linked to an account. Actions: Site:ListAccountSites`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeAccountSitesRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeAccountSites,
  },
  {
    method: "post",
    path: "/sites/accounts/:account",
    alias: "Assign Sites To Account",
    description: `Assign one or more sites to an account. Actions: Site:AssignSiteToAccount`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeAssignSitesToAccountRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "post",
    path: "/sites/atomic",
    alias: "Create Site Atomic",
    description: `Create a site via the client-supplied bundle (base + facets). Target of client.createAtomic.. Actions: Site:CreateSiteInstance`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ componentType: z.string(), creator: z.string().optional(), serialNumber: z.string().optional(), allowsCyclicalChildConnections: z.boolean().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityType: z.string(), icon: z.string().optional(), description: z.string().optional(), type: z.string(), updater: z.string().optional(), facets: z.array(
                z.discriminatedUnion("facetType", [XubeCreateSiteAtomicAccountEntityEntityFacetAccountRequest, XubeCreateSiteAtomicLocationEntityComponentFacetLocationRequest, XubeCreateSiteAtomicChildEntityComponentFacetChildRequest])
            ), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), service: z.string().optional(), name: z.string().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), config: z.object({ inheritFromParent: z.boolean(), overrides: z.object({}).partial().passthrough() }).partial().passthrough().optional(), modelOrigin: z.object({ versionId: z.string(), modelId: z.string() }), slug: z.string().optional(), siteType: z.enum(["solar", "warehouse", "office", "factory", "datacenter", "other"]).optional() }).passthrough()
      },
    ],
    response: z.object({ id: z.string() }),
  },
  {
    method: "get",
    path: "/systems/",
    alias: "Get Systems",
    description: `List systems (account-scoped). Actions: System:ListSystemsInstance`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetSystemsRequest
      },
    ],
    response: XubeSystems,
  },
  {
    method: "post",
    path: "/systems/",
    alias: "Create System",
    description: `Create a new system (atomic component + facet write). Actions: System:CreateSystemInstance`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeCreateSystemRequest
      },
    ],
    response: z.object({ id: z.string().min(3) }),
  },
  {
    method: "get",
    path: "/systems/:system",
    alias: "Get System",
    description: `Get a single system by id. Actions: System:GetSystemInstance`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ system: z.string() })
      },
      {
        name: "system",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeSystem,
  },
  {
    method: "delete",
    path: "/systems/:system",
    alias: "Delete System",
    description: `Delete a system. Actions: System:DeleteSystemInstance`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ system: z.string() })
      },
      {
        name: "system",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "patch",
    path: "/systems/:system",
    alias: "Update System",
    description: `Update a system. Actions: System:UpdateSystemInstance`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeUpdateSystemRequest
      },
      {
        name: "system",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeSystem,
  },
  {
    method: "get",
    path: "/systems/:system/account",
    alias: "Get System Account",
    description: `Get the account currently linked to this system. Actions: System:GetSystemAccount`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ system: z.string() })
      },
      {
        name: "system",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeSystemAccount,
  },
  {
    method: "post",
    path: "/systems/:system/location",
    alias: "Set System Location",
    description: `Set the system&#x27;s lat/lng (singleton LOCATION facet).. Actions: System:SetSystemLocation`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetSystemLocationRequest
      },
      {
        name: "system",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "post",
    path: "/systems/:system/placement",
    alias: "Set System Placement",
    description: `Set the system&#x27;s plan-relative placement (x/y/z as percentages of its parent&#x27;s plan canvas). Singleton per system.. Actions: System:SetSystemPlacement`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetSystemPlacementRequest
      },
      {
        name: "system",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "get",
    path: "/systems/:system/plan",
    alias: "Get System Plan",
    description: `Get the system plan metadata + URL. Actions: System:GetSystemPlan`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ system: z.string() })
      },
      {
        name: "system",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeSystemPlan,
  },
  {
    method: "post",
    path: "/systems/:system/plan",
    alias: "Set System Plan",
    description: `Get presigned upload URL for system plan image. Actions: System:SetSystemPlan`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeSetSystemPlanRequest
      },
      {
        name: "system",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeSetSystemPlanResponse,
  },
  {
    method: "delete",
    path: "/systems/:system/plan",
    alias: "Clear System Plan",
    description: `Clear the system plan (deletes image + facet). Actions: System:ClearSystemPlan`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ system: z.string() })
      },
      {
        name: "system",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "get",
    path: "/systems/accounts/:account",
    alias: "List Account Systems",
    description: `List all systems linked to an account. Actions: System:ListAccountSystems`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeAccountSystemsRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeAccountSystems,
  },
  {
    method: "post",
    path: "/systems/accounts/:account",
    alias: "Assign Systems To Account",
    description: `Assign one or more systems to an account. Actions: System:AssignSystemToAccount`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeAssignSystemsToAccountRequest
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ success: z.boolean() }),
  },
  {
    method: "post",
    path: "/systems/atomic",
    alias: "Create System Atomic",
    description: `Create a system via the client-supplied bundle (base + facets). Target of client.createAtomic.. Actions: System:CreateSystemInstance`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ componentType: z.string(), creator: z.string().optional(), serialNumber: z.string().optional(), allowsCyclicalChildConnections: z.boolean().optional(), created: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), entityType: z.string(), icon: z.string().optional(), description: z.string().optional(), type: z.string(), updater: z.string().optional(), facets: z.array(
                z.discriminatedUnion("facetType", [XubeCreateSystemAtomicAccountEntityEntityFacetAccountRequest, XubeCreateSystemAtomicChildEntityComponentFacetChildRequest])
            ), lifecycle: z.enum(["ACTIVE", "INACTIVE"]), accountId: z.string().optional(), service: z.string().optional(), name: z.string().optional(), id: z.string().min(3), updated: z.string().regex(/^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$/).datetime({ offset: true }).optional(), config: z.object({ inheritFromParent: z.boolean(), overrides: z.object({}).partial().passthrough() }).partial().passthrough().optional(), modelOrigin: z.object({ versionId: z.string(), modelId: z.string() }), slug: z.string().optional() }).passthrough()
      },
    ],
    response: z.object({ id: z.string() }),
  },
  {
    method: "get",
    path: "/systems/by-site/:site",
    alias: "Get Systems By Site",
    description: `List systems whose CHILD facet is anchored to this site. Actions: System:ListSystemsInstance`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ system: z.string() })
      },
      {
        name: "site",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeSystems,
  },
  {
    method: "get",
    path: "/transactions/accounts/:account",
    alias: "Get Account Transactions Count",
    description: `Get account transactions count. Actions: transaction:GetTransactionsCountInstance`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetAccountTransactionCountsRequest
      },
      {
        name: "from",
        type: "Query",
        schema: z.string()
      },
      {
        name: "to",
        type: "Query",
        schema: z.string()
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeGetAccountTransactionCountsResponse,
  },
  {
    method: "get",
    path: "/transactions/accounts/:account/devices",
    alias: "Get Devices Transactions Count",
    description: `Get devices transactions count. Actions: transaction:GetTransactionsCountInstance`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetDevicesTransactionCountsRequest
      },
      {
        name: "from",
        type: "Query",
        schema: z.string()
      },
      {
        name: "groupBy",
        type: "Query",
        schema: z.string()
      },
      {
        name: "to",
        type: "Query",
        schema: z.string()
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeGetDevicesTransactionCountsResponse,
  },
  {
    method: "get",
    path: "/transactions/accounts/:account/devices/:device",
    alias: "Get Device Transactions Count",
    description: `Get device transactions count. Actions: transaction:GetTransactionsCountInstance`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetDeviceTransactionCountsRequest
      },
      {
        name: "from",
        type: "Query",
        schema: z.string()
      },
      {
        name: "groupBy",
        type: "Query",
        schema: z.string()
      },
      {
        name: "to",
        type: "Query",
        schema: z.string()
      },
      {
        name: "account",
        type: "Path",
        schema: z.string()
      },
      {
        name: "device",
        type: "Path",
        schema: z.string()
      },
    ],
    response: XubeGetDeviceTransactionCountsResponse,
  },
  {
    method: "get",
    path: "/transactions/devices",
    alias: "Get Transaction counts by Devices",
    description: `Get transaction counts by devices. Actions: transaction:GetTransactionCountsByDevicesInstance`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: XubeGetTransactionCountsByDevicesRequest
      },
      {
        name: "devices",
        type: "Query",
        schema: z.string().optional()
      },
      {
        name: "from",
        type: "Query",
        schema: z.string()
      },
      {
        name: "groupBy",
        type: "Query",
        schema: z.string()
      },
      {
        name: "to",
        type: "Query",
        schema: z.string()
      },
    ],
    response: XubeGetTransactionCountsByDevicesResponse,
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
        schema: z.object({ user: z.string().email() })
      },
      {
        name: "user",
        type: "Path",
        schema: z.string()
      },
    ],
    response: z.object({ deleted: z.string().datetime({ offset: true }).optional(), v: z.string(), created: z.string().datetime({ offset: true }), name: z.string(), id: z.string().min(3), email: z.string().email() }).passthrough(),
  },
]);

export const xubeDev = new Zodios("https://api.dev.xube.dev", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, {
    ...options,
    axiosConfig: {
      ...(options?.axiosConfig ?? {}),
      headers: {
        ...(options?.axiosConfig?.headers ?? {})
      }
    }
  });
}
