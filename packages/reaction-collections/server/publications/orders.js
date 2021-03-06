/**
 * orders
 */

Meteor.publish("Orders", function () {
  const shopId = ReactionCore.getShopId();

  if (Roles.userIsInRole(this.userId, ["admin", "owner"], shopId)) {
    return ReactionCore.Collections.Orders.find({
      shopId: shopId
    });
  }
  return ReactionCore.Collections.Orders.find({
    shopId: shopId,
    userId: this.userId
  });
});

/*
 * account orders
 */

Meteor.publish("AccountOrders", function (userId, currentShopId) {
  check(userId, Match.OptionalOrNull(String));
  check(currentShopId, Match.OptionalOrNull(String));
  if (this.userId === null) {
    return this.ready();
  }
  if (typeof userId === "string" && this.userId !== userId) {
    return this.ready();
  }
  const shopId = currentShopId || ReactionCore.getShopId();

  return ReactionCore.Collections.Orders.find({
    shopId: shopId,
    userId: this.userId
  });
});

/*
 * completed cart order
 */
Meteor.publish("CompletedCartOrder", function (userId, cartId) {
  check(userId, Match.OneOf(String, null));
  check(cartId, String);

  if (userId !== this.userId) {
    return this.ready();
  }

  return ReactionCore.Collections.Orders.find({
    cartId: cartId,
    userId: userId
  });
});
