package client.inventory;

public enum DonorPetFeatureType {
	DROP(0), DPS(1), BOSSHP(2);
	private byte type;
	
	private DonorPetFeatureType(int type) {
		this.type = (byte) type;
	}
	
	public int getType() {
		return type;
	}
	
	public static DonorPetFeatureType getByType(int type) {
		for (DonorPetFeatureType feature_type : DonorPetFeatureType.values())
			if (feature_type.getType() == (byte) type)
				return feature_type;
		return null;
	}
}
