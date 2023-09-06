package e2e

type Chain struct {
	Name          string                 `name:"name" json:"name" yaml:"name"`
	Type          string                 `name:"type" json:"type" yaml:"type"`
	NumValidators int                    `name:"num-validators" json:"num_validators" yaml:"numValidators"`
	Ports         Port                   `name:"ports" json:"ports" yaml:"ports"`
	Genesis       map[string]interface{} `name:"genesis" json:"genesis" yaml:"genesis"`
}

type Port struct {
	Rest    int `name:"rest" json:"rest" yaml:"rest"`
	Rpc     int `name:"rpc" json:"rpc" yaml:"rpc"`
	Grpc    int `name:"grpc" json:"grpc" yaml:"grpc"`
	Exposer int `name:"exposer" json:"exposer" yaml:"exposer"`
}

type Relayer struct {
	Name     string   `name:"name" json:"name" yaml:"name"`
	Type     string   `name:"type" json:"type" yaml:"type"`
	Replicas int      `name:"replicas" json:"replicas" yaml:"replicas"`
	Chains   []string `name:"chains" json:"chains" yaml:"chains"`
}

type Feature struct {
	Enabled bool   `name:"enabled" json:"enabled" yaml:"enabled"`
	Image   string `name:"image" json:"image" yaml:"image"`
	Ports   Port   `name:"ports" json:"ports" yaml:"ports"`
}

// Config is the struct for the config.yaml setup file
// todo: move this to a more common place, outside of just tests
// todo: can be moved to proto defination
type Config struct {
	Chains   []*Chain   `name:"chains" json:"chains" yaml:"chains"`
	Relayers []*Relayer `name:"relayers" json:"relayers" yaml:"relayers"`
	Explorer *Feature   `name:"explorer" json:"explorer" yaml:"explorer"`
	Registry *Feature   `name:"registry" json:"registry" yaml:"registry"`
}

// HasChainId returns true if chain id found in list of chains
func (c *Config) HasChainId(chainId string) bool {
	for _, chain := range c.Chains {
		if chain.Name == chainId {
			return true
		}
	}

	return false
}

// GetChain returns the Chain object pointer for the given chain id
func (c *Config) GetChain(chainId string) *Chain {
	for _, chain := range c.Chains {
		if chain.Name == chainId {
			return chain
		}
	}

	return nil
}
