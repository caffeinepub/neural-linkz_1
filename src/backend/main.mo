import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";

actor {
  type Category = {
    #featured;
    #mainstream;
    #open_source;
    #onchain;
  };

  type Model = {
    id : Text;
    name : Text;
    description : Text;
    category : Category;
    url : Text;
    logoUrl : Text;
  };

  module Model {
    public func compare(m1 : Model, m2 : Model) : Order.Order {
      Text.compare(m1.name, m2.name);
    };
  };

  let models = Map.empty<Text, Model>();

  public type ModelInput = {
    id : Text;
    name : Text;
    description : Text;
    category : Category;
    url : Text;
    logoUrl : Text;
  };

  public shared ({ caller }) func addModel(model : ModelInput) : async () {
    let newModel : Model = {
      id = model.id;
      name = model.name;
      description = model.description;
      category = model.category;
      url = model.url;
      logoUrl = model.logoUrl;
    };
    models.add(model.id, newModel);
  };

  public query ({ caller }) func getAllModels() : async [Model] {
    models.values().toArray().sort();
  };

  public query ({ caller }) func getModelsByCategory(category : Category) : async [Model] {
    models.values().filter(
      func(model) { model.category == category }
    ).toArray();
  };
};
